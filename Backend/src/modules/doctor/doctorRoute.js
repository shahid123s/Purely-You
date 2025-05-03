import express from 'express';
import { doctorController } from './doctorController.js';
const router = express.Router();

router.put('/update-roomId', doctorController.getDoctors )
router.get('/appointments', doctorController.getAppoinments)