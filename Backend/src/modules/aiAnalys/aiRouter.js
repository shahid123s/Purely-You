import express from 'express';
import { aiAnalyserController } from './aiController.js';
const router = express.Router();


router.post('/analyse', aiAnalyserController)

export default router;