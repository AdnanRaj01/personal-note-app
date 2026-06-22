# 📝 Personal Notes App

A full-stack Personal Notes Management Application built with **Node.js, Express.js, MongoDB, EJS, Passport.js, and Bootstrap**. Users can securely create, manage, update, search, and organize personal notes with image uploads, reviews, authentication, authorization, and password recovery functionality.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration (Signup)
* User Login
* User Logout
* Password Hashing using Passport-Local-Mongoose
* Session Management
* Protected Routes
* Owner-Based Authorization
* Review Author Authorization

---

### 📧 Password Recovery

* Forgot Password System
* Email Verification
* OTP Generation
* OTP Validation
* Password Reset Functionality

---

### 📝 Notes Management

* Create Notes
* View Notes
* Update Notes
* Delete Notes
* Personal Dashboard
* My Notes Section
* Search Notes by Title
* Note Categories
* Priority Management
* Status Tracking

---

### 🖼 Image Upload

* Upload Images with Notes
* Multer Integration
* Image Preview on Dashboard
* Image Display on Note Details Page

---

### ⭐ Review System

* Add Reviews
* Delete Reviews
* Rating System (1–5 Stars)
* Comment System
* Review Ownership Protection

---

### 🎨 User Interface

* Responsive Bootstrap Design
* Flash Messages
* Form Validation
* Password Show/Hide Toggle
* Professional Dashboard Layout
* Footer with Privacy Policy, Terms & Contact Pages

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS Templates

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose

### Additional Packages

* Multer
* Express Session
* Connect Flash
* Method Override
* Dotenv
* Nodemailer
* OTP Generator
* EJS Mate
* Joi

---

## 📂 Project Structure

```bash
Personal-Notes-App/
│
├── controllers/
│   ├── notes.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── note.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── note.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── notes/
│   ├── users/
│   ├── layouts/
│   └── includes/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── uploads/
│
├── middleware.js
├── schema.js
├── index.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/personal-notes-app.git
```

### Go to Project Directory

```bash
cd personal-notes-app
```

### Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
SESSION_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password
```

---

## 🗄 Database Setup

Make sure MongoDB is running locally.

```bash
mongodb://127.0.0.1:27017/personal_notes_app
```

---

## ▶ Run Application

### Development Mode

```bash
nodemon index.js
```

### Production Mode

```bash
node index.js
```

---

## 🌐 Default URLs

### Home

```bash
http://localhost:3000
```

### Signup

```bash
http://localhost:3000/signup
```

### Login

```bash
http://localhost:3000/login
```

### Dashboard

```bash
http://localhost:3000/notes
```

---

## 🔒 Security Features

* Password Hashing
* Session Authentication
* Route Protection
* Authorization Middleware
* Flash Messages
* Form Validation
* Input Validation using Joi

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Signup Page
* Dashboard
* Create Note Page
* Note Details Page
* Review Section

Example:

```md
![Dashboard](screenshots/dashboard.png)
```

---

## 🚧 Future Improvements

* Cloudinary Image Upload
* User Profile Page
* Dark Mode
* Pagination
* Note Sharing
* Rich Text Editor
* PDF Export
* Admin Dashboard
* Notifications System
* API Integration

---

## 👨‍💻 Author

Muhammad Adnan

GitHub:
https://github.com/AdnanRaj01

LinkedIn:
https://linkedin.com/in/[yourprofile](https://www.linkedin.com/in/muhammad-adnan-a0a1aa2b1/)

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub and share your feedback.
