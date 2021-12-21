import dotenv from 'dotenv';
dotenv.config();

export const dbInfo = {
    host: process.env.APP_DB_HOST || 'localhost',
    user: process.env.APP_DB_USER || 'root',
    password: process.env.APP_DB_PASSWORD || 'toor',
    database: process.env.APP_DB_NAME || 'db1'
}
