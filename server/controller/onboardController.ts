import { RequestHandler } from "express";
import passport from "passport";
import passportConfig from "../config/passportConfig";
import User from "../models/User";
import dotenv from "dotenv";

import { UserDoc } from "../interfaces/interfaces";
dotenv.config();

// Passport config
passportConfig(passport);

export const onboard: RequestHandler = async (req, res) => {
    const { userType } = req.body;
    try {
        const user = req.user as UserDoc | null;
        const email = user?.email;

        if (!user) return res.sendStatus(401);
        const currentUser = await User.findOne({ email });
        if (currentUser) {
            currentUser.userType = userType;
            await currentUser.save();
            res.status(204);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
