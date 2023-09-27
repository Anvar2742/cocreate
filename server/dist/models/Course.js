"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please a enter title"],
    },
    description: {
        type: String,
        required: [true, "Please enter a description"],
    },
    tutorId: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
});
const Course = mongoose_1.default.model("course", CourseSchema);
exports.default = Course;
//# sourceMappingURL=Course.js.map