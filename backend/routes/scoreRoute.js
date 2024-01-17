import express from 'express';
const router = express.Router();
import { completeExercise } from '../controllers/scoreController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/:id').post(protect,completeExercise);




export default router;