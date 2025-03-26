import express from 'express';
import { authController } from './authController.js';
const router = express.Router();

// User Authentication Routes
router.post('/user/login',authController.userLogin);
router.post('/user/register', authController.userRegister);

// Doctor Authentication Routes
router.post('/doctor/login',authController.doctorLogin);
router.post('/doctor/register', authController.doctorRegister);


// Admin Authentication Routes
router.post('/admin/login', authController.adminLogin);
router.post('/admin/register', authController.adminRegister);


export default router;