import dotenv from 'dotenv';

dotenv.config()
export const envConfig = {
    databaseUrl: process.env.MONGODB_URL!,
    port: process.env.PORT,
    url: process.env.URL!,
}