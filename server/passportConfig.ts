import UserDoc from "./interfaces/userInterface";
import User from "./models/User";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport: any) => {
    // used to serialize the user for the session
    passport.serializeUser(function (user: UserDoc, done: CallableFunction) {
        done(null, { email: user.email });
    });

    // used to deserialize the user
    passport.deserializeUser(function (id: string, done: CallableFunction) {
        User.findById(id, function (err: any, user: UserDoc) {
            done(err, user);
        });
    });

    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    // check if user exists
                    const userExists = await User.findOne({ email: email });
                    if (userExists) {
                        return done(null, false);
                    }
                    // Create a new user with the user data provided
                    const user = await User.create({ email, password });
                    return done(null, user);
                } catch (error) {
                    console.log(error);

                    done(error);
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
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email: email });
                    if (!user) return done(null, false);
                    const isMatch = await user.matchPassword(password);
                    if (!isMatch) return done(null, false);
                    // if passwords match return user
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
