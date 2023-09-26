import { Router } from "express";
import passport from "passport";
import { createCourse } from "../controller/courseController";

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

courseRouter.post(
    "/course",
    passport.authenticate("jwt", { session: false }),
    createCourse
);

export default courseRouter;
