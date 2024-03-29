import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@description: Auth user and get token
//@route GET/api/users/login
//@access Public
const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){

        generateToken(res,user._id)

        res.status(200).json({
            _id:user._id,
            name:user.username,
            email:user.email,
            isAdmin:user.isAdmin,
        })  
    }else{
        res.status(401)
        throw new Error('Invalid email or password');
    }
    
});

//@desc Register User
//@route POST/api/users/
//@access Public
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }    

    

    const user = await User.create({
        username,
        email,
        password,
    });

    if(user){
        generateToken(res,user._id);    

        res.status(201).json({
            _id:user._id,
            name:user.username,
            email:user.email,
            isAdmin:user.isAdmin
        });

    }else{
        res.status(400);
        throw new Error('invalid user data');
    }
    
});

//@desc Logout user/clear cookie
//@route POST/api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    });
    
    res.status(200).json({message:'Logged out successfully'})
});

//@desc get users by proficiency level in descending order for ranking
//@route GET/api/users/proficiency/:lang
//@access Private
const getUsersByProficiency = asyncHandler(async (req, res) => {
    const language = req.params.language;
    try {
      const users = await User.find({}).select('-password').sort({ [`proficiencyLevel.${language}`]: -1 });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users by proficiency level:', error);
      res.status(500).json({ message: 'Failed to fetch users by proficiency level' });
    }
  });
  



//@desc Get User Profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.username,
            email:user.email,
            isAdmin:user.isAdmin,
            proficiencyLevel:user.proficiencyLevel
        });
    }else{
        res.status(404)
        throw new Error('User not found');
    }
});


//@desc Update User Profile
//@route PUT/api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req,res)=>{
    
    const user = await User.findById(req.user._id);

    if(user){
        user.username = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.body.password){
            user.password= req.body.password;
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id:updateUser._id,
            username:updateUser.username,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        });

    }else{
        res.status(404)
        throw new Error('User not found');
    }
});





/*---------------------------<<Controlers for admin>>--------------------------*/

//@desc get users
//@route GET/api/users
//@access Private/admin
const getUsers = asyncHandler(async (req,res)=>{
    const users = await User.find({});
    res.status(200).json(users);
});

//@desc get users by id
//@route GET/api/users/:id
//@access Private/admin
const getUserByID = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.status(200).json(user);
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
});

//@desc Delete Users
//@route DELETE/api/users/:id
//@access Private/admon
const deleteUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin user')
        }
        await User.deleteOne({_id:user._id});
        res.status(200).json({message:'User delted successfully '});
    }else{
        res.status(404);
        throw new Error('User not found')
    }
});


//@desc update Users
//@route PUT/api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req,res)=>{
    
    const user = await User.findById(req.params.id);

    if(user){
        user.name=req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save()

        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }

});

export {
    //accesible by users
    authUser,
    registerUser,
    logoutUser,
    getUsersByProficiency,
    getUserProfile,
    updateUserProfile,


    //admin routes
    getUsers,
    getUserByID,
    updateUser,
    deleteUser
}




