import dotenv from 'dotenv'
dotenv.config();

export const appConfig = {
    app: {
        port: process.env.PORT || 5600,
        environment: process.env.NODE_ENV || 'development',
    },
    cors: {
        origin: process.env.ORIGIN_URL,
    },
    db: {
        uri: process.env.MONGO_URI,
    },
    jwt: {
        accessSecret: process.env.ACCESS_TOKEN_SECRET,
        accessExpiry: process.env.ACCESS_TOKEN_LIFETIME,
        refreshSecret: process.env.REFRESH_TOKEN_SECRET,
        refreshExpiry: process.env.REFRESH_TOKEN_LIFETIME,
    },
    email: {
        email: process.env.NODEMAILER_EMAIL,
        password: process.env.NODEMAILER_PASSWORD
    },

}

