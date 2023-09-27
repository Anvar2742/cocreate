"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLesson = exports.getSingleLesson = exports.getLessons = exports.createLesson = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Lesson_1 = __importDefault(require("../models/Lesson"));
const slugify_1 = __importDefault(require("../utils/slugify"));
dotenv_1.default.config();
const handleErrors = (err) => {
    const lessonErrors = {
        title: "",
        description: "",
    };
    // Lesson with that name already exists
    if (err.code === 11000) {
        lessonErrors.title = "This title is already in use";
        return lessonErrors;
    }
    if (err.message.includes("validation failed")) {
        const validationErrors = err.errors;
        Object.values(validationErrors).forEach(({ path, properties, }) => {
            if (path) {
                lessonErrors[path] = properties === null || properties === void 0 ? void 0 : properties.message;
            }
        });
    }
    return lessonErrors;
};
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, courseId } = req.body;
    try {
        const slug = (0, slugify_1.default)(title);
        const newLesson = yield Lesson_1.default.create({
            title,
            description,
            slug,
            courseId,
        });
        if (!newLesson)
            return res.sendStatus(400);
        res.send(newLesson);
    }
    catch (error) {
        const errors = handleErrors(error);
        res.send(errors);
    }
});
exports.createLesson = createLesson;
const getLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.body;
    try {
        const lessons = yield Lesson_1.default.find({ courseId });
        if (!lessons.length)
            return res.sendStatus(404);
        res.status(200).send(lessons);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getLessons = getLessons;
const getSingleLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.body;
    try {
        if (!slug)
            return res.sendStatus(400);
        const lesson = yield Lesson_1.default.findOne({ slug });
        if (!lesson)
            return res.sendStatus(404);
        res.status(200).send(lesson);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getSingleLesson = getSingleLesson;
const updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug, content } = req.body;
    try {
        if (!slug)
            return res.sendStatus(400);
        const lesson = yield Lesson_1.default.findOne({ slug });
        if (!lesson)
            return res.sendStatus(404);
        if (!content)
            return res.sendStatus(400);
        lesson.content = content;
        yield lesson.save();
        res.status(204).send(lesson);
    }
    catch (error) {
        res.send(error);
    }
});
exports.updateLesson = updateLesson;
//# sourceMappingURL=lessonController.js.map