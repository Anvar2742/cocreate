import { Request, Response } from "express";
import { CourseDoc, UserDoc } from "../interfaces/interfaces";
import dotenv from "dotenv";
import Lesson from "../models/Lesson";
import slugify from "../utils/slugify";
import User from "../models/User";
import Course from "../models/Course";
dotenv.config();

const handleErrors = (err: any) => {
    const lessonErrors: { [key: string]: string | undefined } = {
        title: "",
        description: "",
    };

    // console.log(err);

    // Lesson with that name already exists
    if (err.code === 11000) {
        lessonErrors.title = "This title is already in use";
        return lessonErrors;
    }

    if (err.message.includes("validation failed")) {
        const validationErrors = err.errors as {
            [key: string]: { message: string; path?: string };
        };

        Object.values(validationErrors).forEach(
            ({
                path,
                properties,
            }: {
                path?: string;
                properties?: { message: string };
            }) => {
                if (path) {
                    lessonErrors[path] = properties?.message;
                }
            }
        );
    }

    return lessonErrors;
};

export const createLesson = async (req: Request, res: Response) => {
    const { title, description, courseId } = req.body;
    const user = req.user as UserDoc;
    try {
        const slug = slugify(title);
        const tutorId = user._id;

        const isTakenName = await Lesson.find({ slug, courseId });
        if (isTakenName?.length)
            return res.status(400).json({ title: "Name already taken" });

        const newLesson = await Lesson.create({
            title,
            description,
            slug,
            courseId,
            tutorId,
        });

        if (!newLesson) return res.sendStatus(400);

        res.status(201).send(newLesson);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).send(errors);
    }
};

export const getLessons = async (req: Request, res: Response) => {
    const user = req.user as UserDoc;
    const { courseId } = req.body;
    try {
        const lessons = await Lesson.find({ courseId, tutorId: user._id });
        // console.log(lessons);

        if (!lessons.length) return res.sendStatus(404);
        res.status(200).send(lessons);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getLessonsStudent = async (req: Request, res: Response) => {
    const user = req.user as UserDoc;
    const { courseId } = req.body;
    try {
        const student = await User.findOne({ _id: user._id });
        if (!student) return res.sendStatus(401);
        const courseIds = student.courses;

        const hasAccess = courseIds.filter((el) => el === courseId);
        if (!hasAccess.length) return res.sendStatus(401);
        const lessons = await Lesson.find({ courseId });

        if (!lessons.length) return res.sendStatus(404);
        res.status(200).send(lessons);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSingleLesson = async (req: Request, res: Response) => {
    const { slug } = req.body;
    const user = req.user as UserDoc;

    try {
        if (!slug) return res.sendStatus(400);
        const lesson = await Lesson.findOne({ slug, tutorId: user._id });

        if (!lesson) return res.sendStatus(404);
        res.status(200).send(lesson);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSingleLessonStudent = async (req: Request, res: Response) => {
    const { courseSlug, lessonSlug } = req.body;
    // const user = req.user as UserDoc;

    try {
        if (!lessonSlug || !courseSlug) return res.status(400).send("No slug");
        const course = (await Course.findOne({
            slug: courseSlug,
        })) as CourseDoc;
        const lesson = await Lesson.findOne({
            slug: lessonSlug,
            courseId: course._id,
        });

        if (!lesson) return res.sendStatus(404);
        res.status(200).send(lesson);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateLessonContent = async (req: Request, res: Response) => {
    const { slug, content } = req.body;

    try {
        if (!slug) return res.sendStatus(400);
        const lesson = await Lesson.findOne({ slug });
        if (!lesson) return res.sendStatus(404);
        if (!content) return res.sendStatus(400);
        lesson.content = content;
        await lesson.save();
        console.log(lesson);

        res.status(204).send(lesson);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateLesson = async (req: Request, res: Response) => {
    const { lessonData } = req.body;

    try {
        if (!lessonData) return res.sendStatus(400);
        const lesson = await Lesson.findOne({ _id: lessonData._id });

        if (!lesson) return res.sendStatus(404);
        Object.keys(lessonData).forEach((key) => {
            if (lessonData[key]) {
                (lesson as any)[key] = lessonData[key];
            }
        });
        await lesson.save();

        res.status(204).send(lesson);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
