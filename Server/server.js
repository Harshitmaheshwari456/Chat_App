import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
  },
});

io.on("connection",(socket)=>{console.log(socket.id)

    socket.on("Join_Room",(room)=>{
        socket.join(room);
        console.log(`User ID , ${socket.id} joined room , ${room}`)
    })

    socket.on("sendMessage",(data)=>{
        console.log("Send message data ", data);
        socket.to(data.room).emit("ReceiveMessage", data);

    })

    socket.on("disconnect",()=>{
        console.log("User disconnected...",socket.id)
    })
});

app.use(cors());

server.listen(1000,()=>console.log("Server is running on port number 1000."));