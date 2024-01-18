import express from 'express';
const router = express.Router();
import {
  getExerciseByLang,
  getExerciseById,
  getExercisesByDifficulty,
  createExercise,
  updateExercise,
  deleteExercise
} from '../controllers/exerciseController.js';
import { protect } from '../middlewares/authMiddleware.js';

// Routes
router.route('/lang/:lang').get(getExerciseByLang);

router.route('/:id').get(getExerciseById).put(protect, updateExercise).delete(protect, deleteExercise);

router.route('/difficulty/:difficulty').get(protect,getExercisesByDifficulty);

router.route('/').post(protect, createExercise);

export default router;
