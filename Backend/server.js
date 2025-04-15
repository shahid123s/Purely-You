import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDb from './src/config/dbConfig.js';
import corsConfig from './src/config/corsConfig.js';
import {appConfig} from './src/config/appConfig.js';
import errorHandler from './src/middleware/errorHandler.js';

// Routers
import patientRoute from './src/modules/user/userRoute.js';
import aiRoute from './src/modules/aiAnalys/aiRouter.js'
import morgan from 'morgan';
import { autheticateUser } from './src/middleware/userAuthMiddleware.js';
import { patient } from './src/modules/auth/authRoute.js';
const {port} = appConfig.app



const app = express();

app.use(morgan('dev'))

app.use(cookieParser());
app.use(express.json());
app.use(corsConfig);
console.log("hi")
app.get('/', (req, res) => {
    res.end('Hello World!');
}) 
app.use('/analyse',aiRoute )
app.use('/api/patient/auth', patient );
app.use('/api/patient',autheticateUser, patientRoute)
app.use(errorHandler)
console.log('here')


app.listen(port, async () => {
  try {
    await connectMongoDb();
    process.stdout.write(`Server is running on port ${port}\n`);
  } catch (error) {
    process.stderr.write(`Failed to start server: ${error.message}\n`);
    process.exit(1);
  }
});
