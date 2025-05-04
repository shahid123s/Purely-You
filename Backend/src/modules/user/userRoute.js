import express from 'express';
import { bookAppointment, getAllDoctors, getAppointments, getDoctor, getDoctorChat, getPatientProfile, sendMessage } from './userController.js';
const router = express.Router();



router.get('/profile', getPatientProfile );
router.get('/doctors', getAllDoctors)
router.get('/doctor', getDoctor)
router.get('/get-appoinments', getAppointments);
router.post('/book-appointment', bookAppointment);
router.get('/chat/:doctorId', getDoctorChat);
router.post('/chat', sendMessage)


export default router;