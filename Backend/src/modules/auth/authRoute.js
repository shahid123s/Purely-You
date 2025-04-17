import express from 'express';
import { authController } from './authController.js';
const patient = express.Router();
const doctor = express.Router();
const admin = express.Router();

// User Authentication Routes
patient.post('/login',authController.userLogin);
patient.post('/register', authController.userRegister);
patient.post('/refresh-token', authController.userRefreshToken);

// Doctor Authentication Routes
doctor.post('/login',authController.doctorLogin);
doctor.post('/register', authController.doctorRegister);


// Admin Authentication Routes
admin.post('/login', authController.adminLogin);
admin.post('/register', authController.adminRegister);


export {patient, doctor, admin}