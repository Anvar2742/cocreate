interface UserDoc extends Document {
    _id: string;
    email: string;
    password: string;
    refreshToken: string;
    isModified: (pw: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<any>;
}

export default UserDoc;
