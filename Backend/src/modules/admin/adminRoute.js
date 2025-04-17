
// adminRoute.js
import express from 'express';
import { adminController } from './adminController.js';

const router = express.Router();

// Admin routes
// router.get('/', adminController.index);
// router.get('/dashboard', adminController.dashboard);
router.get('/users', adminController.getAllUsers);
// router.post('/users', adminController.createUser);
// router.put('/users/:id', adminController.updateUser);
// router.delete('/users/:id', adminController.deleteUser);

export default router;