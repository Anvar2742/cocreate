import express, { Request, Response } from "express";
import { connect } from "./db";
import authRouters from "./routes/auth";
import session from "express-session";
import flash from "connect-flash";

const app = express();
const port = 5050;

app.use(express.json());

// connect to db
connect();

app.get("/", (req: Request, res: Response) => {
    res.send("cool!");
});
app.use(flash());


app.use(authRouters);

app.listen(port, () => {
    console.log(`Listening on port ${port} ⚡️`);
});
