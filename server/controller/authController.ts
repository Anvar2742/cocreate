import { RequestHandler } from "express";

export const signup: RequestHandler = (req, res, next) => {
    const sessionData = req.session;
    console.log(sessionData);
        
    // sign up
    res.status(202).json({
        user: req.user,
    });
};
