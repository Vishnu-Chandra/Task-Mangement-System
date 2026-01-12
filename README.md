# Personal Task Management System

A full-stack web application that allows users to securely register, log in, and manage their personal tasks.  
Built as part of the **Full Stack Developer Intern – Technical Assignment (Ardentix)**.

---

## 🚀 Features

### 🔐 Authentication & Security
- User registration and login
- Password hashing using bcrypt
- JWT (JSON Web Token) based authentication
- Protected backend and frontend routes
- User-specific data access

### ✅ Task Management
- Create new tasks
- View personal task list
- Edit existing tasks
- Delete tasks
- Tasks are accessible only to the authenticated user

### 🎨 User Interface
- Clean and responsive UI built with Tailwind CSS
- Loading indicators during API calls
- Empty state handling
- Frontend input validation
- User-friendly error and success messages

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── utils/
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or above)
- npm
- MongoDB (local installation or MongoDB Atlas)

---

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repository-link>
cd task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory (you can copy `.env.example`):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secure_jwt_secret
```

**⚠️ Important:** Replace `your_secure_jwt_secret` with a strong, random string for production use.

Run the backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` directory (you can copy `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note:** For production, update `VITE_API_URL` to your backend API URL.

Run the frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks (Protected Routes)
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 Security Highlights
- Passwords are securely hashed using bcrypt
- JWT used for stateless authentication
- Authorization middleware protects task routes
- Users can only access their own data

---

## 📌 Optional Enhancements Implemented
- Frontend input validation
- Loading and empty states
- Clean and responsive UI
- Modular backend architecture

---

## 🚧 Future Improvements
- Task filtering and sorting
- Task priority levels
- Due dates and reminders


---

## 👨‍💻 Author

**Vishnu Chandra**  
Built for the **Ardentix Full Stack Developer Intern Selection Process**

