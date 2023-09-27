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
exports.giveAccessToCourse = exports.getSingleCourse = exports.getCourses = exports.createCourse = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Course_1 = __importDefault(require("../models/Course"));
const slugify_1 = __importDefault(require("../utils/slugify"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const handleErrors = (err) => {
    const courseErrors = {
        title: "",
        description: "",
    };
    // Course with that name already exists
    if (err.code === 11000) {
        courseErrors.title = "This title is already in use";
        return courseErrors;
    }
    if (err.message.includes("validation failed")) {
        const validationErrors = err.errors;
        Object.values(validationErrors).forEach(({ path, properties, }) => {
            if (path) {
                courseErrors[path] = properties === null || properties === void 0 ? void 0 : properties.message;
            }
        });
    }
    return courseErrors;
};
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const tutor = req.user;
        const tutorId = tutor._id;
        const slug = (0, slugify_1.default)(title);
        const newCourse = yield Course_1.default.create({
            title,
            description,
            slug,
            tutorId,
        });
        if (!newCourse)
            return res.sendStatus(400);
        res.send(newCourse);
    }
    catch (error) {
        const errors = handleErrors(error);
        res.send(errors);
    }
});
exports.createCourse = createCourse;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userType = user.userType;
        const courseIds = user.courses;
        const userId = user._id;
        let query = { userId };
        if (userType === "student") {
            query = { _id: { $in: courseIds } };
        }
        const courses = yield Course_1.default.find(query);
        console.log(courses);
        if (!courses.length)
            return res.sendStatus(404);
        res.status(200).send(courses);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getCourses = getCourses;
const getSingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.body;
    try {
        if (!slug)
            return res.sendStatus(400);
        const course = yield Course_1.default.findOne({ slug });
        if (!course)
            return res.sendStatus(404);
        res.status(200).send(course);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getSingleCourse = getSingleCourse;
const giveAccessToCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentEmail: email, courseId } = req.body;
    try {
        const user = req.user;
        if (!user || user.userType !== "tutor") {
            return res.status(401).send("You're not a tutor:(");
        }
        if (!email)
            return res.status(400).send("Provide email");
        const student = yield User_1.default.findOne({ email });
        if (!student)
            return res.status(404).send("No student with this email");
        if (!courseId)
            return res.status(400).send("No course ID");
        student.courses.push(courseId);
        yield student.save();
        res.status(204).send("Data saved successfully");
    }
    catch (error) {
        console.log(error);
    }
});
exports.giveAccessToCourse = giveAccessToCourse;
//# sourceMappingURL=courseController.js.map