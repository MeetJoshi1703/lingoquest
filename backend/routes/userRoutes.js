import express from 'express';
const router = express.Router();

import { authUser,registerUser,logoutUser,getUsersByProficiency } from '../controllers/userController.js';



router.route('/').post(registerUser);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.get('/proficiency/:language',getUsersByProficiency);

export default router;