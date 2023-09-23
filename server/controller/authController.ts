import { RequestHandler } from "express";
import passport from "passport";
import passportConfig from "../passportConfig";
import User from "../models/User";
import jwt, { Secret } from "jsonwebtoken";
import UserDoc from "../interfaces/userInterface";
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

export const signup: RequestHandler = async (req, res) => {
    const { email, password, passwordRep } = req.body;
    try {
        const errors = handleEmptyErrors(email, password, passwordRep);
        if (Object.keys(errors).length === 0)
            return res.status(400).json(errors);

        if (password !== passwordRep) {
            return res
                .status(400)
                .json({ passwordRep: "Passwords need to match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ email: "User already exists" });
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
        res.send(err);
    }
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.sendStatus(404);
        }

        const matchPassword = user.matchPassword(password);

        if (!matchPassword) {
            return res.sendStatus(401);
        }

        const { refreshToken, accessToken } = createJWT(user);

        // Saving refreshToken with current user
        user.refreshToken = refreshToken;
        await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ accessToken });
    } catch (err) {
        res.send(err);
    }
};

export const refresh: RequestHandler = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({ refreshToken }).exec();
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
                { expiresIn: "15m" }
            );
            res.json({ accessToken });
        }
    );
};
