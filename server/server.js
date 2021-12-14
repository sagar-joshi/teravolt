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
import {msgHandlers as registerMsgHandlers} from './routes/message.routes.js';

dotenv.config();
const port = process.env.PORT || 3000;
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{cors:corsConfig});

app.use(cors(corsConfig));
app.use(express.json());    //bodyparser middleware
app.use(session({secret: process.env.SESSION_SECRET || "session_secret_here", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/message', messageRoutes);

const onConnection = (socket) => {
  registerMsgHandlers(io, socket);
}

io.on("connection", onConnection);

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});