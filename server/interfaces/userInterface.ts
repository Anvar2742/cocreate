interface UserDoc extends Document {
    _id: string;
    email: string;
    password: string;
    isModified: (pw: string) => Promise<boolean>;
    matchPassword: (pw: string) => Promise<boolean>;
}

export default UserDoc;
