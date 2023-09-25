export interface UserDoc extends Document {
    save(): unknown;
    _id: string;
    email: string;
    password: string;
    refreshToken: string;
    isModified: (pw: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<UserDoc>;
}

export interface CourseDoc extends Document {
    save(): unknown;
    _id: string;
    title: string;
    description: string;
    tutorId: string;
    slug: string;
}
