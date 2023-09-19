import { RequestHandler } from "express";

export const signup: RequestHandler = (req, res, next) => {
    console.log("sign up");

    // sign up
    res.status(202).json({
        user: req.user,
    });
};
