import dotenv from 'dotenv';
import express from 'express';

import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());    //bodyparser middleware
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});