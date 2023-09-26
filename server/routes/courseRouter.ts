import { Router } from "express";
import passport from "passport";
import {
    createCourse,
    getCourses,
    getSingleCourse,
    giveAccessToCourse,
} from "../controller/courseController";

const courseRouter = Router();

courseRouter.get(
    "/courses",
    passport.authenticate("jwt", { session: false }),
    getCourses
);

courseRouter.post(
    "/create_course",
    passport.authenticate("jwt", { session: false }),
    createCourse
);

courseRouter.post(
    "/course",
    passport.authenticate("jwt", { session: false }),
    getSingleCourse
);

courseRouter.post(
    "/access_course",
    passport.authenticate("jwt", { session: false }),
    giveAccessToCourse
);

export default courseRouter;
