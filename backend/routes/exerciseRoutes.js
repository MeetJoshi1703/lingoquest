import express from 'express';
const router = express.Router();
import { getExerciseByLang } from '../controllers/exerciseController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/:lang').get(protect,getExerciseByLang);




export default router;