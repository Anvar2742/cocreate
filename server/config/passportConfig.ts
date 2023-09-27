import User from "../models/User";
import { PassportStatic } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const passportConfig = (passport: PassportStatic) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    };

    passport.use(
        new Strategy(opts, async (jwtPayload, done) => {
            try {
                const user = await User.findOne({ email: jwtPayload.email });

                if (user) {
                    return done(null, user);
                } else {
                    const customError = new Error("No user found");
                    return done(customError, false);
                }
            } catch (error) {
                return done(error, false);
            }
        })
    );
};

export default passportConfig;
