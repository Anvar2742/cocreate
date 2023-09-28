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

app.listen(port, () => {
    console.log(`Listening on port ${port} ✨`);
});
