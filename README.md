<div align="center">

# ChatApp
*Real-Time group chatting application built using React, Node, Express, MongoDB and Socket.io*

![GitHub last commit](https://img.shields.io/github/last-commit/nbinayak02/ChatApp)
![GitHub language count](https://img.shields.io/github/languages/count/nbinayak02/ChatApp)
![GitHub top language](https://img.shields.io/github/languages/top/nbinayak02/ChatApp)

*Built with these tools and technologies.*


![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Express Js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
![Node JS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=Socket.io&logoColor=white&style=flat-square)  
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge) 
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b?style=for-the-badge&logo=mongodb&logoColor=white) 
![Mongoose](https://img.shields.io/badge/Mongoose-%23CC2041?logo=mongoose&logoColor=white&style=for-the-badge) 
![npm](https://img.shields.io/badge/npm-%23CB3837?logo=npm&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/vite-%23646CFF?logo=vite&logoColor=white&style=for-the-badge) 

</div>

---
# Introduction

ChatApp is a real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO. Users can join a global chat room, send and receive messages instantly, and view active users, messages etc. It includes user authentication, authorization, and basic admin control.

# Features

User Features

- Signup, Login, Logout (JWT-based)
- Update profile, view info, and delete account
- Real-time chatting in a single global room
- Displays total active (online) users
- "User connected" and "User disconnected" notifications

Admin Features

- Default admin credentials (see below)
- Manage users: view, delete
- View total system stats (users, chats)

# Tech Stack

Frontend:

- React (Vite)
- Tailwind CSS
- Socket.IO Client

Backend:

- Node.js
- Express.js
- MongoDB (Mongoose) 
- Socket.IO
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment variables

> Project requires to install and setup MongoDB Compass.

# Environment Variables

## Backend (`server/.env`)

```
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
JWT_SECRET=Secret_Code_Here
DEFAULT_ADMIN_EMAIL=admin@chatapp.com
DEFAULT_ADMIN_PASSWORD=admin123

```

## Frontend (`client/.env`)

```
VITE_API_URL="http://localhost:5000"
```

# Installation

### Clone Repository

```
git clone https://github.com/nbinayak02/ChatApp.git
cd ChatApp
```

### Setup backend

```
cd server
npm install
npm run dev
```

### Setup frontend

```
cd client
npm install
npm run dev
```

# API Endpoints

| Method |Endpoint| Description |
|----------|----------|----------|
| POST | /api/auth/signup | User Signup |
| POST | /api/auth/login | User Login |
| POST | /api/auth/admin/login | Admin Login |
| GET | /api/user/ | Returns user id and username |
| GET | /api/user/details | Returns full details about user |
| PATCH | /api/user/username/:id |Updates username |
| DELETE | /api/user/:id | Deletes user account |
| GET | /api/chat/recentMessages | Returns last 20 messages |
| GET | /api/admin/totalChats | Returns total chats (message) count |
| GET | /api/admin/allUsers | Returns all registered users |
| DELETE | /api/admin/deleteUser/:id | Deletes specific user |



---

>Note: The project was developed as a part of technical assignment for Palm Mind Technologies.
