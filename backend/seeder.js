import mongoose from "mongoose";
import dotenv from 'dotenv';
import usersData from "./data/users.js";
import exerciseData from "./data/exercise.js";
import User from './models/userModel.js'
import Exercise from './models/exerciseModel.js'
import connectDB from "./db/db.js";

dotenv.config();
connectDB();

const importData = async ()=>{
    try {
        await User.deleteMany();
        await Exercise.deleteMany();

        await User.insertMany(usersData); 
        await Exercise.insertMany(exerciseData);

        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const destroyData =async ()=>{
    try {        
        await User.deleteMany();
        await Exercise.deleteMany();

        console.log("Data Destroyed");
        process.exit(); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}