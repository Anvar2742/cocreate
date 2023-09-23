import User from "./models/User";
import passport, { PassportStatic } from "passport";
import { Request } from "express";
import UserDoc from "./interfaces/userInterface";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const passportConfig = (passport: PassportStatic) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    };

    passport.use(
        new Strategy(opts, async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload.id);

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.log(error);

                return done(error, false);
            }
        })
    );
};

export default passportConfig;
