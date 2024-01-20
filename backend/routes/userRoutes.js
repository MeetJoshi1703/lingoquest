import express from 'express';

const router = express.Router();

import { protect,admin } from '../middlewares/authMiddleware.js';

import { 
    //public
    authUser,
    registerUser,
    
    //private
    logoutUser,
    getUsersByProficiency,
    getUserProfile,
    updateUserProfile,

    //admin
    getUsers,
    getUserByID,
    updateUser,
    deleteUser

} from '../controllers/userController.js';


router.route('/').post(registerUser).get(protect,admin,getUsers);

router.post('/logout',logoutUser);

router.post('/auth',authUser);

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

router.get('/proficiency/:language',getUsersByProficiency);

router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserByID).put(protect,admin,updateUser);

export default router;