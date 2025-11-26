<div align="center">

  <h1>✨ TaskMaster Pro</h1>
  
  <p>
    A modern, full-stack Task Management Dashboard built with the MERN Stack.
    <br />
    Features Role-Based Access Control, Dark Mode, and a Premium Glassmorphism UI.
  </p>

  <p>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="MUI" />
  </p>
  
  <br />

</div>

<br />

## 🚀 Key Features

| Frontend (React + MUI) | Backend (Node + Express) |
| :--- | :--- |
| 🎨 **Premium UI:** Glassmorphism & Elevations | 🔐 **JWT Auth:** Secure Login/Signup |
| 🌓 **Theme:** One-click Light/Dark Mode | 🛡️ **RBAC:** Admin vs. User Roles |
| 📱 **Responsive:** Fully mobile-optimized | 💾 **Database:** MongoDB Atlas/Local |
| ⚡ **Interactivity:** Hover effects & Transitions | 🚀 **REST API:** Full CRUD Operations |
| 📊 **Dashboard:** Pagination & Status Chips | 🔒 **Security:** Password Hashing (Bcrypt) |

---

## 🛠️ Tech Stack

- **Client:** React (Vite), Material UI v5, Axios, React Router DOM.
- **Server:** Node.js, Express.js, Concurrently (for dev).
- **Database:** MongoDB, Mongoose.
- **Authentication:** JSON Web Tokens (JWT), BcryptJS.

---

## ⚡ Quick Start Guide (The Easy Way)

This project uses `concurrently` to run both the frontend and backend with a single command.

### 1. Installation
Install dependencies for the Root, Server, and Client folders.

```bash
# 1. Root dependencies (Concurrently)
npm install

# 2. Server dependencies
cd server
npm install

# 3. Client dependencies
cd ../client
npm install

Now, whenever you want to start your project:
Open one terminal in the root task-app folder.
Run: npm run dev