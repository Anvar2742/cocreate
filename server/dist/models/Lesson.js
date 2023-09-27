"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const LessonSchema = new Schema({
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
const Lesson = mongoose_1.default.model("lesson", LessonSchema);
exports.default = Lesson;
//# sourceMappingURL=Lesson.js.map