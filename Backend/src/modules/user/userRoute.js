import express from 'express';
import { getAllDoctors, getAppointments, getPatientProfile } from './userController.js';
const router = express.Router();



router.get('/profile', getPatientProfile );
router.get('/doctors', getAllDoctors)
router.get('/get-appoinments', getAppointments);



export default router;