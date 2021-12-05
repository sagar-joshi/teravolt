import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './utils/auth.js';

import userRoutes from './routes/user.routes.js';
import groupRoutes from './routes/group.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());    //bodyparser middleware
app.use(session({secret: process.env.SESSION_SECRET || "session_secret_here", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRoutes);
app.use('/group', groupRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});