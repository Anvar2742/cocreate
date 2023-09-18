import express, { Request, Response } from "express";
const app = express();
const port = 5000;
import passport from "passport";
import { connect } from "./db";
import passportConfig from "./passportConfig";

app.use(express.json());

// Passport config
passportConfig(passport);

// connect to db
connect();

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});

app.post(
    "/auth/signup",
    passport.authenticate("local-signup", { session: false }),
    (req: Request, res: Response, next: CallableFunction) => {
        console.log("sign up");

        // sign up
        res.json({
            user: req.user,
        }).sendStatus(202);
    }
);

app.listen(port, () => {
    console.log(`Listening on port ${port} ⚡️`);
});
