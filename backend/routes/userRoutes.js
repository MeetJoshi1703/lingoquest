import express from 'express';

const router = express.Router();

import { protect } from '../middlewares/authMiddleware.js';

import { 
    authUser,
    registerUser,
    logoutUser,
    getUsersByProficiency,
    getUserProfile,
    updateUserProfile 
} from '../controllers/userController.js';


router.route('/').post(registerUser);

router.post('/logout',logoutUser);

router.post('/auth',authUser);

router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.get('/proficiency/:language',getUsersByProficiency);

export default router;