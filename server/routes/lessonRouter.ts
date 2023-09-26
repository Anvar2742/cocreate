import { Router } from "express";
import passport from "passport";
import {
    createLesson,
    getLessons,
    getSingleLesson,
} from "../controller/lessonController";

const lessonRouter = Router();

lessonRouter.post(
    "/lessons",
    passport.authenticate("jwt", { session: false }),
    getLessons
);

lessonRouter.post(
    "/create_lesson",
    passport.authenticate("jwt", { session: false }),
    createLesson
);

lessonRouter.post(
    "/lesson",
    passport.authenticate("jwt", { session: false }),
    getSingleLesson
);

export default lessonRouter;
