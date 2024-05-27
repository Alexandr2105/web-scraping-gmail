import { config } from 'dotenv';
config();

export const settings = {
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URL: process.env.REDIRECT_URL,
}