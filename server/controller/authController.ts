import { RequestHandler } from "express";
import passport from "passport";
import passportConfig from "../passportConfig";
import UserDoc from "../interfaces/userInterface";

// Passport config
passportConfig(passport);

export const signup: RequestHandler = (req, res, next) => {
    passport.authenticate(
        "local-signup",
        function (err: any, user: UserDoc, info: any) {
            if (err) {
                if (err.code === 11000) {
                    return res
                        .status(409)
                        .json({ email: "User already exists" });
                } else {
                    return res.sendStatus(400);
                }
            }

            return res.json(user);
        }
    )(req, res, next);
};

export const getUser: RequestHandler = (req, res, next) => {
    const user = req.user;

    try {
        console.log("user: ", user );
        
        res.send(user);
    } catch (error) {
        console.log(error);
    }
};
