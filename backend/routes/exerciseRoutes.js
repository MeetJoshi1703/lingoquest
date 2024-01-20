import express from 'express';
const router = express.Router();

import {
  getExerciseByLang,
  getExerciseById,
  getExercisesByDifficulty,

  // Admin Routes
  createExercise,
  updateExercise,
  deleteExercise

} from '../controllers/exerciseController.js';

import { protect,admin } from '../middlewares/authMiddleware.js';


router.route('/lang/:lang').get(protect,getExerciseByLang);

router.route('/:id').get(protect,getExerciseById).put(protect,admin,updateExercise).delete(protect,admin,deleteExercise);

router.route('/difficulty/:difficulty').get(getExercisesByDifficulty);

router.route('/').post(protect,admin,createExercise);

export default router;
