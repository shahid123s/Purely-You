import express from 'express';
import { doctorController } from './doctorController.js';
const router = express.Router();

// router.put('/update-roomId', doctorController.getDoctors )
router.get('/appointments', doctorController.getAppoinments)
router.put('/accept-appointments', doctorController.actionAppoinment)
router.put('/appointments/ui-state', doctorController.updateUIState)
router.put('/appointments', doctorController.updateRecords);
router.get('/chats', doctorController.getChats)
router.get('/chat/patient', doctorController.getPatientChat)
router.post('/chats/send', doctorController.sendMessage)


export default router;