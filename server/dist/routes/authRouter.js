"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = __importDefault(require("../config/passportConfig"));
const onboardController_1 = require("../controller/onboardController");
// Passport config
(0, passportConfig_1.default)(passport_1.default);
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/signup", authController_1.signup);
exports.authRouter.post("/login", authController_1.login);
exports.authRouter.get("/logout", authController_1.logout);
// refresh token to get new access tokens
exports.authRouter.get("/refresh", authController_1.refresh);
// use passport.authenticate('jwt') to protect routes
// Onboarding
exports.authRouter.post("/onboarding", passport_1.default.authenticate("jwt", { session: false }), onboardController_1.onboard);
exports.default = exports.authRouter;
//# sourceMappingURL=authRouter.js.map