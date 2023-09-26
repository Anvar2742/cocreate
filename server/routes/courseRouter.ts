import { Router } from "express";
import passport from "passport";
import { createCourse, getCourses } from "../controller/courseController";

const courseRouter = Router();

courseRouter.get(
    "/courses",
    passport.authenticate("jwt", { session: false }),
    getCourses
);

courseRouter.post(
    "/course",
    passport.authenticate("jwt", { session: false }),
    createCourse
);

export default courseRouter;
