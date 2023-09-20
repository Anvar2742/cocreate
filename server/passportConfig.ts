import passportLocal from "passport-local";
import User from "./models/User";
import { Request } from "express"; // Import Request from express
import UserDoc from "./interfaces/userInterface";

const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport: any) => {
    // used to serialize the user for the session
    passport.serializeUser(function (user: UserDoc, done: any) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id: string, done: any) {
        User.findById(id, function (err: any, user: any) {
            done(err, user);
        });
    });

    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (
                req: Request,
                email: string,
                password: string,
                done: any
            ) => {
                if (email) email = email.toLowerCase();

                try {
                    await User.findOne({ email }).catch((err) => done(err));

                    // Create a new user with the user data provided
                    const newUser = await User.create({ email, password });
                    return done(null, newUser);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email: string, password: string, done: any) => {
                try {
                    const user = await User.findOne({ email });

                    if (!user) {
                        return done(null, false);
                    }

                    const isMatch = await user.matchPassword(password);

                    if (!isMatch) {
                        return done(null, false);
                    }

                    return done(null, user);
                } catch (error) {
                    console.log(error);
                    return done(error, false);
                }
            }
        )
    );
};

export default passportConfig;
