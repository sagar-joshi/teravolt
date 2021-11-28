import dotenv from 'dotenv';
dotenv.config();

export const dbInfo = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'your mysql root user password here',
    database: process.env.DB_NAME || 'database name here'
}
