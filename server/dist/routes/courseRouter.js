"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const courseController_1 = require("../controller/courseController");
const courseRouter = (0, express_1.Router)();
courseRouter.get("/courses", passport_1.default.authenticate("jwt", { session: false }), courseController_1.getCourses);
courseRouter.post("/create_course", passport_1.default.authenticate("jwt", { session: false }), courseController_1.createCourse);
courseRouter.post("/course", passport_1.default.authenticate("jwt", { session: false }), courseController_1.getSingleCourse);
courseRouter.post("/access_course", passport_1.default.authenticate("jwt", { session: false }), courseController_1.giveAccessToCourse);
exports.default = courseRouter;
//# sourceMappingURL=courseRouter.js.map