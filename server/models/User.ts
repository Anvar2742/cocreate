import mongoose from "mongoose";
import bcrypt from "bcrypt";
import getErrorMessage from "../utils/getErrorMsg";
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", async function (next) {
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
        getErrorMessage(error);
        return next();
    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
