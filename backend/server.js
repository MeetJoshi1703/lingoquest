import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'
import cookieParser from 'cookie-parser';
import connectDB from "./db/db.js";
import exerciseRoutes from './routes/exerciseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import scoreRoutes from './routes/scoreRoute.js';
const port = process.env.PORT || 8000;
dotenv.config();    

connectDB();

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/api/exercise',exerciseRoutes);
app.use('/api/users',userRoutes)
app.use('/api/score',scoreRoutes)

const __dirname = path.resolve();
if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{
        res.send("Hello World");
    });    
}

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})