import { Router } from "express";
import passport from "passport";
import {
    createLesson,
    getLessons,
    getLessonsStudent,
    getSingleLesson,
    getSingleLessonStudent,
    updateLesson,
} from "../controller/lessonController";

const lessonRouter = Router();

lessonRouter.post(
    "/lessons",
    passport.authenticate("jwt", { session: false }),
    getLessons
);

lessonRouter.post(
    "/lessons/student",
    passport.authenticate("jwt", { session: false }),
    getLessonsStudent
);

lessonRouter.post(
    "/lessons/create",
    passport.authenticate("jwt", { session: false }),
    createLesson
);

lessonRouter.post(
    "/lesson",
    passport.authenticate("jwt", { session: false }),
    getSingleLesson
);

lessonRouter.post(
    "/lesson/student",
    passport.authenticate("jwt", { session: false }),
    getSingleLessonStudent
);

lessonRouter.put(
    "/lesson",
    passport.authenticate("jwt", { session: false }),
    updateLesson
);

export default lessonRouter;
