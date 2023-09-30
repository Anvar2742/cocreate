import mongoose from "mongoose";
import { CourseDoc } from "../interfaces/interfaces";
const { Schema } = mongoose;

const CourseSchema = new Schema<CourseDoc>({
    title: {
        type: String,
        required: [true, "Please a enter title"],
    },
    description: {
        type: String,
    },
    tutorId: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        // unique: true,
    },
});

const Course = mongoose.model("course", CourseSchema);

export default Course;
