import express from 'express';
import authRoutre from './src/modules/auth/authRoute.js'
import cookieParser from 'cookie-parser';
import corsConfig from './src/config/corsConfig.js';
import connectMongoDB from './src/config/dbConfig.js';
import { appConfig } from './src/config/appConfig.js';

import aiAnalyseRoute from './src/modules/aiAnalys/aiRouter.js'
import errorHandler from './src/middleware/errorHandler.js';

const { port } = appConfig.app
const app = express();

app.use(cookieParser);
app.use(express.json());
app.use(corsConfig);

app.get('/', (req, res) => {
    console.log('hello')
    res.end('Hello World!');
})
// app.use('/api/auth', authRoutre);
// app.use('/analys' , aiAnalyseRoute)

app.use(errorHandler)

app.listen(port, async () => {
    try {
        await connectMongoDB();
        process.stdout.write(`Server is running on port ${port}\n`);
    } catch (error) {
        process.stderr.write(`Failed to start server: ${error.message}\n`);
        process.exit(1);
    }
})


