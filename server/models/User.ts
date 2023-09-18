import mongoose from "mongoose";
import bcrypt from "bcrypt";
import getErrorMessage from "../utils/getErrorMsg";
const { Schema } = mongoose;

interface UserDoc extends Document {
    email: string;
    password: string;
    isModified: (pw: string) => Promise<boolean>;
    matchPassword: (pw: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDoc>({
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
        console.log(getErrorMessage(error));
        getErrorMessage(error);
        return next();
    }
});

UserSchema.methods.matchPassword = async function (password: any) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(getErrorMessage(error));

        throw new Error(getErrorMessage(error));
    }
};

const User = mongoose.model<UserDoc>("User", UserSchema);

export default User;
