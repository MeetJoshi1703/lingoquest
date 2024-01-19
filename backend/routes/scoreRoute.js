import express from 'express';
const router = express.Router();

import { 
    completeExercise,
    getCompletedExercisesByUser,
    resetUserExercise
 } from '../controllers/scoreController.js';

import { protect } from '../middlewares/authMiddleware.js';



router.route('/').get(getCompletedExercisesByUser);

router.route('/:id').post(completeExercise).put(resetUserExercise);




export default router;