import { Router } from "express";
import passport from "passport";
import {
    createLesson,
    getLessons,
    getSingleLesson,
    updateLesson,
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

lessonRouter.put(
    "/lesson",
    passport.authenticate("jwt", { session: false }),
    updateLesson
);

export default lessonRouter;
