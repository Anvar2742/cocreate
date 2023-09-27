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
exports.refresh = exports.logout = exports.login = exports.signup = void 0;
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = __importDefault(require("../config/passportConfig"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Passport config
(0, passportConfig_1.default)(passport_1.default);
const createJWT = (user) => {
    // create JWTs
    const accessToken = jsonwebtoken_1.default.sign({
        email: user.email,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    return { accessToken, refreshToken };
};
const handleEmptyErrors = (email, password, passwordRep) => {
    let errors = { email: "", password: "", passwordRep: "" };
    if (!email) {
        errors.email = "Please enter an email";
    }
    if (!password) {
        errors.password = "Please enter a password";
    }
    if (!passwordRep && passwordRep !== null) {
        errors.passwordRep = "Please enter your password again";
    }
    return errors;
};
// Error handling
const handleErrors = (err) => {
    // console.log(err);
    const errors = {
        email: "",
        password: "",
    };
    // User already exists
    if (err.code === 11000) {
        errors.email = "User already exists, please log in.";
        return errors;
    }
    // validation errors
    if (err.message.includes("User validation failed")) {
        const validationErrors = err.errors;
        // console.log(validationErrors);
        Object.values(validationErrors).forEach(({ path, properties, }) => {
            if (path) {
                errors[path] = properties === null || properties === void 0 ? void 0 : properties.message;
            }
        });
    }
    if (err.message.includes("not valid email")) {
        errors.password = "Please enter a valid email";
    }
    if (err.message.includes("incorrect password")) {
        errors.password = "Incorrect Password";
    }
    if (err.message.includes("No user with this email")) {
        errors.email = "No user with this email";
    }
    return errors;
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, passwordRep } = req.body;
    try {
        const errors = handleEmptyErrors(email, password, passwordRep);
        if (Object.keys(errors).length === 0) {
            return res.status(400).json(errors);
        }
        if (password !== passwordRep) {
            return res
                .status(400)
                .json({ passwordRep: "Passwords need to match" });
        }
        const newUser = yield User_1.default.create({ email, password });
        const { refreshToken, accessToken } = createJWT(newUser);
        // Saving refreshToken with current user
        newUser.refreshToken = refreshToken;
        yield newUser.save();
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ accessToken });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userInstance = new User_1.default();
        const logedInUser = yield userInstance.login(email, password);
        const { refreshToken, accessToken } = createJWT(logedInUser);
        // Saving refreshToken with current loged in user
        logedInUser.refreshToken = refreshToken;
        yield logedInUser.save();
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const foundUser = yield User_1.default.findOne({ refreshToken }).exec();
    // if in db clear out cookie
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.sendStatus(204);
    }
    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = yield foundUser.save();
    // console.log(result);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
});
exports.logout = logout;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const refreshToken = cookies === null || cookies === void 0 ? void 0 : cookies.jwt;
    if (!refreshToken)
        return res.sendStatus(401);
    const user = yield User_1.default.findOne({ refreshToken }).exec();
    if (!user)
        return res.sendStatus(403); // Forbidden
    // evaluate jwt
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.email !== decoded.email)
            return res.sendStatus(403);
        const accessToken = jsonwebtoken_1.default.sign({
            email: user.email,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        return res.json({ accessToken });
    });
});
exports.refresh = refresh;
//# sourceMappingURL=authController.js.map