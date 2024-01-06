# StudyNotion Backend

## Architecture

StudyNotion utilizes a monolithic architecture for the backend, leveraging the following technologies:

- **Node.js**: Primary backend framework.
- **Express.js**: Web application framework.
- **MongoDB**: Primary database for flexible and scalable data storage.

## Features and Functionalities

1. **User Authentication and Authorization:**
   - Students and instructors can sign up and log in.
   - OTP verification and forgot password functionality for added security.

2. **Course Management:**
   - Instructors can CRUD courses.
   - Manage course content and media.
   - Students can view and rate courses.

3. **Payment Integration:**
   - Razorpay integration for handling payments during the checkout flow.

4. **Cloud-Based Media Management:**
   - Cloudinary is used to store and manage all media content (images, videos, documents).

5. **Markdown Formatting:**
   - Course content in Markdown format for easier display and rendering on the front end.

## Frameworks, Libraries, and Tools

- **Node.js**: Primary backend framework.
- **MongoDB**: Primary database.
- **Express.js**: Web application framework.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **Bcrypt**: Password hashing for enhanced security.
- **Mongoose**: Object Data Modeling library for MongoDB interaction.

