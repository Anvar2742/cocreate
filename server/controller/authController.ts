import { RequestHandler } from "express";
import passport from "passport";
import passportConfig from "../config/passportConfig";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { UserDoc } from "../interfaces/interfaces";
import dotenv from "dotenv";
dotenv.config();

// Passport config
passportConfig(passport);

const createJWT = (user: UserDoc) => {
    // create JWTs
    const accessToken = jwt.sign(
        {
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "10s" }
    );

    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
    );

    return { accessToken, refreshToken };
};

const handleEmptyErrors = (
    email: string,
    password: string,
    passwordRep: string | null
) => {
    let errors: {
        email: string;
        password: string;
        passwordRep: string;
    } = { email: "", password: "", passwordRep: "" };

    if (!email) {
        errors.email = "Please enter an email";
    }
    if (!password) {
        errors.password = "Please enter a password";
    }
    if (!passwordRep && passwordRep !== null) {
        errors.passwordRep = "Please enter your password again";
    }

    return errors;
};

// Error handling
const handleErrors = (err: any) => {
    // console.log(err);
    const errors: { [key: string]: string | undefined } = {
        email: "",
        password: "",
    };
    // User already exists
    if (err.code === 11000) {
        errors.email = "User already exists, please log in.";
        return errors;
    }

    // validation errors
    if (err.message.includes("User validation failed")) {
        const validationErrors = err.errors as {
            [key: string]: { message: string; path?: string };
        };
        // console.log(validationErrors);

        Object.values(validationErrors).forEach(
            ({
                path,
                properties,
            }: {
                path?: string;
                properties?: { message: string };
            }) => {
                if (path) {
                    errors[path] = properties?.message;
                }
            }
        );
    }

    if (err.message.includes("not valid email")) {
        errors.password = "Please enter a valid email";
    }

    if (err.message.includes("incorrect password")) {
        errors.password = "Incorrect Password";
    }

    if (err.message.includes("No user with this email")) {
        errors.email = "No user with this email";
    }

    return errors;
};

export const signup: RequestHandler = async (req, res) => {
    const { email, password, passwordRep } = req.body;
    try {
        const errors = handleEmptyErrors(email, password, passwordRep);
        if (Object.keys(errors).length === 0) {
            return res.status(400).json(errors);
        }

        if (password !== passwordRep) {
            return res
                .status(400)
                .json({ passwordRep: "Passwords need to match" });
        }

        const newUser = await User.create({ email, password });
        const { refreshToken, accessToken } = createJWT(newUser);

        // Saving refreshToken with current user
        newUser.refreshToken = refreshToken;
        await newUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ accessToken });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userInstance = new User();
        const logedInUser = await userInstance.login(email, password);

        const { refreshToken, accessToken } = createJWT(logedInUser);

        // Saving refreshToken with current loged in user
        logedInUser.refreshToken = refreshToken;
        await logedInUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }
};

export const logout: RequestHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    // if in db clear out cookie
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
};

export const refresh: RequestHandler = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    console.log(cookies);

    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({ refreshToken });
    console.log(user);

    if (!user) return res.sendStatus(403); // Forbidden

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
            if (err || user.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    email: user.email,
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: "10s" }
            );
            return res.json({ accessToken });
        }
    );
};
