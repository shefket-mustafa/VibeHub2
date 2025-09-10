# VibeHub

VibeHub is a full-stack social platform built with **React (TypeScript)**, **Express.js**, **MongoDB**, and **TailwindCSS**. It allows users to register, log in, and share posts with the community.

---

## 🚀 Features

- **Authentication**
  - JWT-based login stored in `localStorage`
  - Protected API routes with Express middleware
  - User registration & login flow
  -  - **Forgot & Reset Password flow via EmailJS**
    - User requests a reset link
    - EmailJS sends a secure link with a time-limited JWT
    - User resets their password via the reset form

- **Posts**
  - Create posts
  - Delete posts
  - Like
  - Comment
  - View all posts in the feed

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS  
- **Backend:** MongoDB + Express.js 
- **Authentication:** JWT stored in `localStorage`
- - **Email Service:** [EmailJS](https://www.emailjs.com/) for password reset flow
- **Global state:** Context API

---

## 📂 Project Structure

    /client
      /src
        /components    -> Reusable UI components
        /context       -> Global state via Context API
        /helpers       -> A helper component made to scroll to top of page on navigation
        /hooks         -> Hooks
        /layout        -> Main pages - Layout, Header, Footer
        /pages         -> Feed, GettingStartedPage, Login, NotFound, Profile, Register
        /types         -> TS types
        /zod           -> Zod Validation Schemas

    /server
      /middleware      -> Middleware used for authorization against unauthorized users
      /routes          -> Routes
      /models          -> Models
       
        

---

## 🔒 Authentication Flow

1. User registers or logs in  
2. Server validates credentials and creates a JWT  
3. JWT is sent back and stored in **localStorage**  
4. API requests include JWT in the `Authorization` header  
5. Middleware verifies the token before processing requests  

---

## 🔑 Forgot & Reset Password Flow (EmailJS)

1. User enters email on the **Forgot Password** page  
2. Server verifies the user and generates a short-lived JWT reset token (15 min)  
3. EmailJS sends a reset email containing a secure link:
4. User clicks the link → lands on the **Reset Password** page  
5. User enters new password → backend verifies token and updates password  

---

## 🌐 Live Demo

👉 [VibeHub Live Demo](https://vibe-hub2.vercel.app/)


---

## ⚡ Getting Started

1. **Clone the repo**

        git@github.com:shefket-mustafa/VibeHub2.git
        cd VibeHub2

2. **Install dependencies**

        cd client && npm install
        cd ../server && npm install

3. **Add environment variables**  
   Create a `.env` file in `/server` with:

        MONGODB_URI=your_mongodb_atlas_uri
        JWT_SECRET=your_secret_key
        PORT=3000

4. **Run the app**

        # Start backend
        cd server
        npm run dev

        # Start frontend
        cd client
        npm run dev

5. Open [http://localhost:5173](http://localhost:5173) to see the app.  

---

## 📌 Roadmap

- [ ] Migrate global state to Redux
- [ ] Memories, Groups and Friends logic to be added
- [ ] Forgot password feature
- [ ] Language toggle


---


## 📜 License

This project is licensed under the **MIT License**.
