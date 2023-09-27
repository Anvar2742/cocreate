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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getErrorMsg_1 = __importDefault(require("../utils/getErrorMsg"));
const validator_1 = __importDefault(require("validator"));
const { Schema } = mongoose_1.default;
function validateEmail(email) {
    return validator_1.default.isEmail(email); // Use the validator library to perform email validation
}
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: "Please enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Minimum password length is 6 characters"],
    },
    refreshToken: {
        type: String,
    },
    userType: {
        type: String,
    },
    courses: {
        type: [String],
    },
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check method of registration
            const user = this;
            if (!user.isModified("password"))
                next();
            // generate salt
            const salt = yield bcrypt_1.default.genSalt(10);
            // hash the password
            const hashedPassword = yield bcrypt_1.default.hash(this.password, salt);
            // replace plain text password with hashed password
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            // console.log(getErrorMessage(error));
            (0, getErrorMsg_1.default)(error);
            return next();
        }
    });
});
UserSchema.methods.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!validator_1.default.isEmail(email)) {
            throw Error("not valid email");
        }
        const user = yield this.model("User").findOne({ email });
        if (!user) {
            throw Error("No user with this email");
        }
        const auth = yield bcrypt_1.default.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map