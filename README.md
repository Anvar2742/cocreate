# Oxillia - An Assistant for Tutors and Learners

## Welcome to Oxillia
Oxillia is a comprehensive platform designed to empower tutors and facilitate the learning process. This platform streamlines the management of courses, lessons, and students, making it easier for tutors to create, organize, and share educational content with their students.

## What Does Oxillia Do?
Oxillia serves as a dynamic tool for tutors, offering the following key functionalities:

### Features

1. **Authentication**: Users can securely sign in and access their accounts, ensuring a personalized and protected experience.

2. **Content Creation**: Tutors can easily craft engaging educational content, including:
    - **Courses**: Create structured course materials.
    - **Lessons**: Design detailed lesson plans.
    - **Text Editor**: Oxillia provides an intuitive text editor, powered by TinyMCE, to create rich and engaging lesson content.

3. **Access Management**: Tutors can efficiently manage and grant access to their courses, enabling seamless interaction between tutors and students.

### Technical Unpacking

#### Tech Stack

**Frontend**:
- React with TypeScript for a responsive and interactive user interface.
- Vite for lightning-fast development and building processes.
- Tailwind CSS for a clean and appealing design.
- Axios for efficient API communication.

**Backend**:
- Express powered by Node.js and TypeScript for a reliable server environment.
- JWT (JSON Web Tokens) for secure user authentication.
- Passport.js for custom authentication strategies.
- MongoDB for efficient data storage.

### Features Breakdown

To provide more insight into Oxillia's capabilities, here's a detailed breakdown of its features:

#### Authentication

I've implemented a custom authentication system using JWT and custom strategies with Passport.js. On the frontend, an authentication context keeps users informed about their roles and login status, ensuring a seamless and secure experience.

#### User, Course, Lessons, and More

Oxillia simplifies the user journey, enabling a smooth transition from sign-up to course creation. Here's a step-by-step guide:

1. **User Registration**: Users can quickly sign up and, after a straightforward onboarding process and email verification, they gain the ability to start creating content.

2. **Course Creation**: Creating courses is an intuitive process. Users can navigate to the courses page, add course details, and easily set up their course materials.

3. **Lesson Creation**: Lessons follow a similar creation process as courses. However, lessons also have a text editor powered by TinyMCE, enabling tutors to craft detailed and engaging content.

4. **Sharing with Students**: Tutors can share their courses with students. Students sign up, complete their onboarding, and verify their email address. Once verified, students can provide their email to their tutor, allowing access to the desired course.
5. **Start the lesson!** 📚✨
