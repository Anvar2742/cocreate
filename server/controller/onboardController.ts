import { Request, Response } from "express";
import User from "../models/User";
import dotenv from "dotenv";

import { UserDoc } from "../interfaces/interfaces";
dotenv.config();

export const onboard = async (req: Request, res: Response) => {
    const { userType } = req.body;
    try {
        if (!userType)
            return res.status(400).json({ msg: "Please select an option" });
        const user = req.user as UserDoc | null;
        const email = user?.email;

        if (!user) return res.status(401).json({ msg: "No user" });
        const currentUser = await User.findOne({ email });
        if (!currentUser) return res.sendStatus(404);
        currentUser.userType = userType;
        currentUser.isOnboard = true;
        await currentUser.save();
        res.sendStatus(204);
    } catch (err) {
        res.status(400).send(err);
    }
};
