import { RequestHandler } from "express";

export const signup: RequestHandler = (req, res, next) => {
    const sessionData = req.session;
    const signupMessage = req.flash("signupMessage");
    console.log(req.flash("signupMessage"));

    const user = req.user;
    if (!user) {
        return res.status(400).json({ message: "" });
    }

    res.status(202).json({
        user,
    });
};
