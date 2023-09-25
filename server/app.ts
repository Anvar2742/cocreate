import express, { Request, Response } from "express";
import { connect } from "./config/db";
import authRouter from "./routes/auth";
import passport from "passport";
import passportConfig from "./config/passportConfig";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import sendEmail from "./utils/sendEmail";
// sendEmail().catch(console.error);

// Passport config
passportConfig(passport);
// connect to db
connect();

const app = express();
const port = 5050;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});
app.use(authRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port} ✨`);
});
