import express from 'express';
const router = express.Router();

import { 
    completeExercise,
    getCompletedExercisesByUser,
    resetUserExercise
 } from '../controllers/scoreController.js';

import { protect } from '../middlewares/authMiddleware.js';



router.route('/',getCompletedExercisesByUser);

router.route('/:id').post(completeExercise).put('/:id',resetUserExercise);




export default router;