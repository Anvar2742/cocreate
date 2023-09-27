import mongoose from "mongoose";
import { LessonDoc } from "../interfaces/interfaces";
const { Schema } = mongoose;

const LessonSchema = new Schema<LessonDoc>({
    title: {
        type: String,
        required: [true, "Please a enter title"],
    },
    description: {
        type: String,
    },
    courseId: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
    },
});

const Lesson = mongoose.model("lesson", LessonSchema);

export default Lesson;
