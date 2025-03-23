import cors from 'cors'
import { appConfig } from './appConfig.js';


//configure the cors 

const corsConfig = cors({
    origin : appConfig.cors.origin,
    credentials: true,               // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
})

export default corsConfig;