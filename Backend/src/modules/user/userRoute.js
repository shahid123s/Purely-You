import express from 'express';
import { getPatientProfile } from './userController.js';
const router = express.Router();



router.get('/profile', getPatientProfile );



export default router;