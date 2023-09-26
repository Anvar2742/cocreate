import { Request, Response } from "express";
import { UserDoc } from "../interfaces/interfaces";
import dotenv from "dotenv";
import Lesson from "../models/Lesson";
import slugify from "../utils/slugify";
dotenv.config();

const handleErrors = (err: any) => {
    const lessonErrors: { [key: string]: string | undefined } = {
        title: "",
        description: "",
    };

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
    try {
        const slug = slugify(title);

        const newLesson = await Lesson.create({
            title,
            description,
            slug,
            courseId,
        });

        if (!newLesson) return res.sendStatus(400);

        res.send(newLesson);
    } catch (error) {
        const errors = handleErrors(error);
        res.send(errors);
    }
};

export const getLessons = async (req: Request, res: Response) => {
    const { courseId } = req.body;
    try {
        const lessons = await Lesson.find({ courseId });
        if (!lessons.length) return res.sendStatus(404);
        res.status(200).send(lessons);
    } catch (error) {
        res.send(error);
    }
};

export const getSingleLesson = async (req: Request, res: Response) => {
    const { slug } = req.body;
    try {
        if (!slug) return res.sendStatus(400);
        const lesson = await Lesson.findOne({ slug });
        if (!lesson) return res.sendStatus(404);
        res.status(200).send(lesson);
    } catch (error) {
        res.send(error);
    }
};

export const updateLesson = async (req: Request, res: Response) => {
    const { slug, content } = req.body;
    try {
        if (!slug) return res.sendStatus(400);
        const lesson = await Lesson.findOne({ slug });
        if (!lesson) return res.sendStatus(404);
        if (!content) return res.sendStatus(400);
        lesson.content = content;
        await lesson.save();

        res.status(204).send(lesson);
    } catch (error) {
        res.send(error);
    }
};
