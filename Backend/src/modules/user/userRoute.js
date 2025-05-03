import express from 'express';
import { bookAppointment, getAllDoctors, getAppointments, getPatientProfile } from './userController.js';
const router = express.Router();



router.get('/profile', getPatientProfile );
router.get('/doctors', getAllDoctors)
router.get('/get-appoinments', getAppointments);
router.post('/book-appointment', bookAppointment);


export default router;