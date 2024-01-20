import express from 'express';
const router = express.Router();

import { 
    completeExercise,
    getCompletedExercisesByUser,
    resetUserExercise
 } from '../controllers/scoreController.js';

import { protect } from '../middlewares/authMiddleware.js';



router.route('/').get(protect,getCompletedExercisesByUser);

router.route('/:id').post(protect,completeExercise).put(protect,resetUserExercise);




export default router;