"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const lessonController_1 = require("../controller/lessonController");
const lessonRouter = (0, express_1.Router)();
lessonRouter.post("/lessons", passport_1.default.authenticate("jwt", { session: false }), lessonController_1.getLessons);
lessonRouter.post("/create_lesson", passport_1.default.authenticate("jwt", { session: false }), lessonController_1.createLesson);
lessonRouter.post("/lesson", passport_1.default.authenticate("jwt", { session: false }), lessonController_1.getSingleLesson);
lessonRouter.put("/lesson", passport_1.default.authenticate("jwt", { session: false }), lessonController_1.updateLesson);
exports.default = lessonRouter;
//# sourceMappingURL=lessonRouter.js.map