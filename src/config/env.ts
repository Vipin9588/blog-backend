import dotenv from 'dotenv';
dotenv.config();
export const env = {
    PORT: Number(process.env.PORT),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DATABASE_URL:process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV:process.env.NODE_ENV
}