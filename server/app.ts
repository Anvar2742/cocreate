import express, { Request, Response } from "express";
import { connect } from "./db";
import authRouter from "./routes/auth";
import passport from "passport";
import passportConfig from "./passportConfig";
import dotenv from "dotenv";
dotenv.config();

// Passport config
passportConfig(passport);

const app = express();
const port = 5050;

app.use(express.json());

// connect to db
connect();

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});
app.use(authRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port} ⚡️`);
});
