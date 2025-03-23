import express from 'express';
import { authController } from './authController.js';
const router = express.Router();

// User Authentication Routes
// router.post('/user/login','');
router.post('/user/register', authController.userRegister);

// Doctor Authentication Routes
// router.post('/doctor/login','');


// Medicall Authentication Routes
// router.post('/medical/login', '');


export default router;