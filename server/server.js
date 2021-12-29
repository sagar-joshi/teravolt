import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';


import './utils/auth.js';
import userRoutes from './routes/user.routes.js';
import groupRoutes from './routes/group.routes.js';
import messageRoutes from './routes/message.routes.js';
import chatRoomRoutes from './routes/chatroom.routes.js';
import {msgHandlers as registerMsgHandlers} from './routes/message.routes.js';
import {groupMemHandler as registerGroupMemHandler} from './routes/group.routes.js';
import {roomMemHandlers as registerRoomMemHandler} from './routes/chatroom.routes.js';

dotenv.config();
const port = process.env.APP_PORT || 5000;
const serverUrl = process.env.APP_SERVER_URL || "http://localhost:3000";
const corsConfig = {
  origin: serverUrl,
  credentials: true
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{cors:corsConfig});

app.use(cors(corsConfig));
app.use(express.json());    //bodyparser middleware
app.use(session({secret: process.env.APP_SESSION_SECRET || "sfw$t4H9A%SG3@40saAG", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/message', messageRoutes);
app.use('/room', chatRoomRoutes);

const onConnection = (socket) => {
  registerMsgHandlers(io, socket);
  registerRoomMemHandler(io, socket);
  registerGroupMemHandler(io, socket);
}

io.on("connection", onConnection);

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});