import express from 'express';
const router = express.Router();
import { completeExercise,resetUserExercise } from '../controllers/scoreController.js';
import { protect } from '../middlewares/authMiddleware.js';


router.route('/:id').post(completeExercise);
router.put('/',protect,resetUserExercise);




export default router;