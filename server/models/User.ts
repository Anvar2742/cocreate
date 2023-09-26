import mongoose from "mongoose";
import bcrypt from "bcrypt";
import getErrorMessage from "../utils/getErrorMsg";
import { UserDoc } from "../interfaces/interfaces";
import validator from "validator";
const { Schema } = mongoose;

function validateEmail(email: string) {
    return validator.isEmail(email); // Use the validator library to perform email validation
}

const UserSchema = new Schema<UserDoc>({
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
        type: Array,
    },
});

UserSchema.pre<UserDoc>("save", async function (next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified("password")) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        // console.log(getErrorMessage(error));
        getErrorMessage(error);
        return next();
    }
});

UserSchema.methods.login = async function (email: string, password: string) {
    if (!validator.isEmail(email)) {
        throw Error("not valid email");
    }
    const user = await this.model("User").findOne({ email });
    if (!user) {
        throw Error("No user with this email");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
        return user;
    }
    throw Error("incorrect password");
};

const User = mongoose.model<UserDoc>("User", UserSchema);

export default User;
