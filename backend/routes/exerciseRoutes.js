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


router.route('/lang/:lang').get(getExerciseByLang);

router.route('/:id').get(getExerciseById).put( updateExercise).delete( deleteExercise);

router.route('/difficulty/:difficulty').get(getExercisesByDifficulty);

router.route('/').post( createExercise);

export default router;
