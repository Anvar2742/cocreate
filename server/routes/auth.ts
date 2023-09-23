import { Router } from "express";
import { login, refresh, signup } from "../controller/authController";
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
        try {
            res.send("cooool?");
        } catch (error) {
            res.send(error);
        }
    }
);

// refresh token to get new access tokens
authRouter.get("/refresh", refresh);

export default authRouter;
