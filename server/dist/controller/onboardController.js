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
exports.onboard = void 0;
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = __importDefault(require("../config/passportConfig"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Passport config
(0, passportConfig_1.default)(passport_1.default);
const onboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userType } = req.body;
    try {
        const user = req.user;
        const email = user === null || user === void 0 ? void 0 : user.email;
        if (!user)
            return res.sendStatus(401);
        const currentUser = yield User_1.default.findOne({ email });
        if (!currentUser)
            return res.sendStatus(404);
        currentUser.userType = userType;
        yield currentUser.save();
        res.sendStatus(204);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.onboard = onboard;
//# sourceMappingURL=onboardController.js.map