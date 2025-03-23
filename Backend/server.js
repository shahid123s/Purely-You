import express from 'express';
import authRoutre from './src/modules/auth/authRoute.js'
import cookieParser from 'cookie-parser';
import corsConfig from './src/config/corsConfig.js';
import connectMongoDB from './src/config/dbConfig.js';
import { appConfig } from './src/config/appConfig.js';



const { port } = appConfig.app
const app = express();

app.use(cookieParser);
app.use(express.json());
app.use(corsConfig);

app.use('/api/auth', authRoutre);

app.listen(port, async () => {
    try {
        await connectMongoDB();
        process.stdout.write(`Server is running on port ${port}\n`);
    } catch (error) {
        process.stderr.write(`Failed to start server: ${error.message}\n`);
        process.exit(1);
    }
})

app.use(errorHandler)

