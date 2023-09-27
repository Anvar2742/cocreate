"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passportConfig = (passport) => {
    const opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    };
    passport.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findOne({ email: jwtPayload.email });
            if (user) {
                return done(null, user);
            }
            else {
                const customError = new Error("No user found");
                return done(customError, false);
            }
        }
        catch (error) {
            return done(error, false);
        }
    })));
};
exports.default = passportConfig;
//# sourceMappingURL=passportConfig.js.map