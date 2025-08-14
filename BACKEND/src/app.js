import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import { log } from 'node:console';
import { connectToSocket } from './controllers/socketManager.js';
import userRoutes from "./routes/users.routes.js"




const app = express();
const server = createServer(app);
const io =  connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({extended: true, limit: '40kb'}));

app.use("/api/v1/users", userRoutes);




const startServer = async () => {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://jain105samyak:4GPnHiNH0EPFVB8I@cluster0.z5vwvbn.mongodb.net/"
    );
    console.log(`Connected to MongoDB at ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    })
}

startServer();