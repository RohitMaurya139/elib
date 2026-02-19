
import dotenv from 'dotenv'

dotenv.config()
const _config = {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    database_Url: process.env.MONGODB_URI,
};

export const config=Object.freeze(_config) // on one can overwrite from other file