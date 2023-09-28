import express, { Request, Response } from "express";
import { connect } from "./config/db";
import authRouter from "./routes/authRouter";
import courseRouter from "./routes/courseRouter";
import passport from "passport";
import passportConfig from "./config/passportConfig";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import sendEmail from "./utils/sendEmail";
import lessonRouter from "./routes/lessonRouter";
// sendEmail().catch(console.error);
const app = express();
const port = 5050;

// Passport config
passportConfig(passport);
// connect to db
connect();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});

// Routes
app.use(authRouter);
app.use(courseRouter);
app.use(lessonRouter);

app.get("/cookie", (req: Request, res: Response) => {
    let cookieVal = null;
    if (req.cookies["3pcookie"]) {
        // check the new style cookie first
        cookieVal = req.cookies["3pcookie"];
    } else if (req.cookies["3pcookie-legacy"]) {
        // otherwise fall back to the legacy cookie
        cookieVal = req.cookies["3pcookie-legacy"];
    } else {
        // Cookie doesn't exist or is empty
        return res.status(404).json({ message: "Cookie not found" });
    }

    res.status(200).json(cookieVal);
});

app.listen(port, () => {
    console.log(`Listening on port ${port} ✨`);
});
