export interface UserDoc extends Document {
    save(): unknown; // TO DO: update this to right type
    _id: string;
    email: string;
    password: string;
    refreshToken: string;
    userType: string;
    courses: string[];
    isOnboard: boolean;
    isModified: (pw: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<UserDoc>;
}

export interface CourseDoc extends Document {
    _id: string;
    title: string;
    description: string;
    tutorId: string;
    slug: string;
}

export interface LessonDoc extends Document {
    _id: string;
    title: string;
    description: string;
    courseId: string;
    slug: string;
    content: string;
}
