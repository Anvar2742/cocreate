import { Router } from "express";
import passport from "passport";
import {
    createCourse,
    getCourses,
    getSingleCourse,
    getSingleCourseStudent,
    giveAccessToCourse,
} from "../controller/courseController";

const courseRouter = Router();

courseRouter.get(
    "/courses",
    passport.authenticate("jwt", { session: false }),
    getCourses
);

courseRouter.post(
    "/courses/create",
    passport.authenticate("jwt", { session: false }),
    createCourse
);

courseRouter.post(
    "/course",
    passport.authenticate("jwt", { session: false }),
    getSingleCourse
);

courseRouter.post(
    "/course/student",
    passport.authenticate("jwt", { session: false }),
    getSingleCourseStudent
);

courseRouter.post(
    "/courses/access",
    passport.authenticate("jwt", { session: false }),
    giveAccessToCourse
);

export default courseRouter;
