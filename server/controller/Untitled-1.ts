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
                return next(err);
            }
            if (!user) {
                res.status(401);
                res.end(info.message);
                return;
            }
        }
    )(req, res, next);
};
