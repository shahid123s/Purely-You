import express from 'express';
import { aiAnalyserController } from './aiController.js';
const router = express.Router();


router.post('/analyze', aiAnalyserController)

export default router;