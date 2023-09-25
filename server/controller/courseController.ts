import { Router } from "express";
import passport from "passport";

const courseRouter = Router();

courseRouter.get(
    "/courses",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            res.send("cooool?");
        } catch (error) {
            res.send(error);
        }
    }
);
