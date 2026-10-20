import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const GOOGLE_GRANT_TYPE = process.env.GOOGLE_GRANT_TYPE;
if (!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is missing");
}

if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is missing");
}

if (!GOOGLE_REDIRECT_URI) {
    throw new Error("GOOGLE_REDIRECT_URI is missing");
}
if (!GOOGLE_GRANT_TYPE) {
    throw new Error("GOOGLE_GRANT_TYPE is missing");
}

export const env = {
    PORT: Number(process.env.PORT),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN,
    GOOGLE_CLIENT_ID:GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI:GOOGLE_REDIRECT_URI,
    GOOGLE_GRANT_TYPE: GOOGLE_GRANT_TYPE
}