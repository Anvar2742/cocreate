import express, { Request, Response } from "express";
import { connect } from "./db";
import authRouters from "./routes/auth";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import passportConfig from "./passportConfig";

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
app.use(flash());

// Configure express-session middleware
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(authRouters);

app.listen(port, () => {
    console.log(`Listening on port ${port} ⚡️`);
});
