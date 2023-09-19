import { Router } from "express";
import { signup } from "../controller/authController";
import passport from "passport";
import passportConfig from "../passportConfig";

const authRouters = Router();

// Passport config
passportConfig(passport);

authRouters.post(
    "/auth/signup",
    passport.authenticate("local-signup", { session: false }),
    signup
);

export default authRouters;
