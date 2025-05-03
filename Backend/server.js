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
import { autheticateDoctor, autheticateUser } from './src/middleware/userAuthMiddleware.js';
import { patient, doctor, admin } from './src/modules/auth/authRoute.js';
import adminRoute from './src/modules/admin/adminRoute.js'
import doctorRoute from './src/modules/doctor/doctorRoute.js'
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
app.use('/api/doctor/auth', doctor);
app.use('/api/admin/auth', admin);
app.use('/api/admin', adminRoute)
app.use('/api/patient',autheticateUser, patientRoute)
app.use('/api/doctor',autheticateDoctor, doctorRoute)
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
