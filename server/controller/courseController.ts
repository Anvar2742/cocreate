import { Request, Response } from "express";
import { UserDoc } from "../interfaces/interfaces";
import dotenv from "dotenv";
import Course from "../models/Course";
import slugify from "../utils/slugify";
dotenv.config();

const handleErrors = (err: any) => {
    const courseErrors: { [key: string]: string | undefined } = {
        title: "",
        description: "",
    };

    // Course with that name already exists
    if (err.code === 11000) {
        courseErrors.title = "This title is already in use";
        return courseErrors;
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
                    courseErrors[path] = properties?.message;
                }
            }
        );
    }

    return courseErrors;
};

export const createCourse = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const tutor = req.user as UserDoc;
        const tutorId = tutor._id;
        const slug = slugify(title);

        const newCourse = await Course.create({
            title,
            description,
            slug,
            tutorId,
        });

        if (!newCourse) return res.sendStatus(400);

        res.send(newCourse);
    } catch (error) {
        const errors = handleErrors(error);
        res.send(errors);
    }
};

export const getCourses = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDoc;
        const tutorId = user._id;
        const courses = await Course.find({ tutorId });
        if (!courses.length) return res.sendStatus(404);
        res.status(200).send(courses);
    } catch (error) {
        res.send(error);
    }
};

export const getSingleCourse = async (req: Request, res: Response) => {
    const { slug } = req.body;
    try {
        if (!slug) return res.sendStatus(400);
        const course = await Course.findOne({ slug });
        if (!course) return res.sendStatus(404);
        res.status(200).send(course);
    } catch (error) {
        res.send(error);
    }
};
