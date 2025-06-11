# Chat_App

A real-time chat application built with **React.js** (frontend) and **Node.js + Express + Socket.IO** (backend).

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, Socket.IO Client
- **Backend:** Node.js, Express.js, Socket.IO, CORS
- **Real-Time Communication:** WebSockets via Socket.IO

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Harshitmaheshwari456/Chat_App.git
cd Chat_App
```

### 2️⃣ Install Backend Dependencies
```bash
cd Server
npm install
```

### 3️⃣ Install Frontend Dependencies
```bash
cd ../Chatting
npm install
```

## 🚀 Running the Application
### Start Backend Server
Inside Server folder:
```bash
nodemon server.js
```
The backend will run by default on:
http://localhost:1000

(You can change the port inside server.js if needed)

## Start Frontend React App
Inside Chatting folder:
```bash
npm run dev
```
The frontend will typically run on:
http://localhost:5173

## 🔗 Important Notes
Make sure your backend server is running before starting the frontend.
The frontend connects to the backend using Socket.IO client.
You can open multiple browser windows/tabs to simulate multiple users chatting in real-time.
