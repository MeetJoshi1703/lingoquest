import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    //Read JWT from cookie
    token = req.cookies.jwt;
    console.log('Token:', token); // Add this line
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log('Decoded userId:', decoded.userId); // Add this line
            req.user = await User.findById(decoded.userId).select('-password');
                        
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized, token failed');    
        }

    }else{
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not Authorized as admin');
    }
}


export {protect,admin}
