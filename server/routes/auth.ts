import { Router } from "express";
import { login, signup } from "../controller/authController";
import passport from "passport";
import passportConfig from "../passportConfig";

// Passport config
passportConfig(passport);

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

// use passport.authenticate('jwt') to protect routes
authRouter.get(
    "/protected-route",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.send("cooool?");
    }
);

export default authRouter;
