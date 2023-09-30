import { Router } from "express";
import passport from "passport";
import passportConfig from "../config/passportConfig";
import { getSingleUser, onboard } from "../controller/userController";

// Passport config
passportConfig(passport);

export const userRouter = Router();

// use passport.authenticate('jwt') to protect routes
// Onboarding
userRouter.post(
    "/onboarding",
    passport.authenticate("jwt", { session: false }),
    onboard
);
// Get single user
userRouter.get(
    "/user",
    passport.authenticate("jwt", { session: false }),
    getSingleUser
);

export default userRouter;
