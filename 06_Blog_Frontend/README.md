# 📝 BlogSphere - Full Stack Blog Management System

A modern, responsive full-stack Blog Management web application built with **React 19**, **Bootstrap 5**, **Node.js**, **Express**, **MongoDB Atlas**, and **Cloudinary**. Users can read blogs, register accounts, log in securely with JWT authentication, and create, edit, or delete their own blog posts with image uploads.

---

## 🚀 Live Demo & Links
-**Live-Link(Vercel)**:[Livelink](https://react-projects-429i-3w9c9ec9q-mohinkhans-projects.vercel.app/)
- **Backend API (Render)**: [https://backend-projects-2-6qxi.onrender.com](https://backend-projects-2-6qxi.onrender.com)
- **Frontend Repository**: [GitHub - React Projects](https://github.com/mohinkhan16/React-Projects)
- **Backend Repository**: [GitHub - Backend Projects](https://github.com/mohinkhan16/Backend-Projects)

---

## ✨ Features

### 👤 User Authentication & Authorization
- **User Registration**: Register with Name, Email, Password, Address, Phone, and optional Profile Picture (uploaded directly to Cloudinary).
- **Secure Login**: JWT (JSON Web Token) authentication with password hashing using `bcryptjs`.
- **Role & Ownership Protection**: Only the author who created a blog can see and use the **Edit** and **Delete** buttons for that blog.

### 📰 Blog Management (CRUD)
- **Browse Blogs**: View all published blogs on the home page with titles, categories, author details, and cover images.
- **Add Blog**: Create rich blogs with Title, Category (`Events`, `sports`, `Motivated`, `fun`), Description, and Cover Image.
- **Edit Blog**: Pre-filled update form to edit title, category, description, and replace images.
- **Delete Blog**: Direct one-click deletion of blogs authored by the logged-in user.

### 🎨 Clean & Responsive UI
- Built with **Bootstrap 5** for seamless mobile, tablet, and desktop responsiveness.
- Smooth Single Page Application (SPA) navigation using **React Router Dom**.
- Pre-configured `vercel.json` to handle SPA route refreshes without 404 errors on Vercel.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Bootstrap 5
- **Routing**: React Router Dom v7
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS
- **File Uploads & Media**: Multer & Multer-Storage-Cloudinary
- **Deployment**: Render

---

## 📁 Project Structure

```text
06_Blog_Frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   ├── Blog.jsx          # Modular blog API calls
│   │   └── user.jsx          # Modular user & auth API calls
│   ├── assets/
│   ├── components/
│   │   └── Navbar.jsx        # Navigation bar with auth-state toggles
│   ├── pages/
│   │   ├── Home.jsx          # Main feed with top banner, blog cards & footer
│   │   ├── BlogForm.jsx      # Create & Edit blog form
│   │   ├── Login.jsx         # User login page
│   │   ├── Register.jsx      # User registration with image upload
│   │   └── MyBlogs.jsx       # User's personal blog management table
│   ├── services/
│   │   └── BlogAxios.jsx     # Central Axios instance with JWT interceptor
│   ├── App.css
│   ├── App.jsx               # Routes and application layout
│   ├── index.css
│   └── main.jsx
├── .env                      # Environment variables
├── vercel.json               # SPA rewrite configuration for Vercel
├── vite.config.js
└── package.json
```

---

## 🔗 API Endpoints Reference

### 🔐 Auth Endpoints (`/JWT/auth` or `/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/user/add` or `/JWT/auth/add` | Register a new user with profile image | No |
| `POST` | `/user/login` or `/JWT/auth/login` | Login user & return JWT token | No |
| `POST` | `/JWT/auth/authLogin` | Get current logged-in user details | Yes (Bearer Token) |
| `GET` | `/user/logout` | Logout user | Yes (Bearer Token) |

### 📝 Blog Endpoints (`/blog`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/blog` or `/blog/all` | Fetch all published blogs with author details | No |
| `POST` | `/blog/add` or `/blog` | Create a new blog with image upload | Yes (Bearer Token) |
| `PATCH` | `/blog/update/:id` or `/blog/:id` | Update an existing blog | Yes (Bearer Token) |
| `DELETE` | `/blog/delete/:id` or `/blog/:id` | Delete a blog by ID | Yes (Bearer Token) |

---

## ⚙️ Installation & Local Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Git

### 2. Frontend Setup
```bash
# Clone the repository
git clone https://github.com/mohinkhan16/React-Projects.git

# Navigate to the frontend directory
cd React-Projects/06_Blog_Frontend

# Install dependencies
npm install

# Create a .env file in the root of 06_Blog_Frontend
echo VITE_BASE_URL=https://backend-projects-2-6qxi.onrender.com > .env

# Run local development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

1. Import the **`React-Projects`** repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to: `06_Blog_Frontend`.
3. Set **Framework Preset** to: `Vite`.
4. Add **Environment Variable**:
   - `VITE_BASE_URL` = `https://backend-projects-2-6qxi.onrender.com`
5. Click **Deploy**. *(The included `vercel.json` automatically takes care of client-side routing).*

---

## 🔑 Test Credentials

If you want to test the live project:
- **Email**: `mohinpathan2004@gmail.com` or `mohin@example.com`
- **Password**: `123456`

---

## 👨‍💻 Author

- **Mohin Pathan** - [GitHub Profile](https://github.com/mohinkhan16)
