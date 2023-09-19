import express, { Request, Response } from "express";
import { connect } from "./db";
import authRouters from "./routes/auth";
import session from "express-session";

const app = express();
const port = 5000;

app.use(express.json());

// connect to db
connect();

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(authRouters);

app.listen(port, () => {
    console.log(`Listening on port ${port} ⚡️`);
});
