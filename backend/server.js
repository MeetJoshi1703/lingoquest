import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./db/db.js";
import exerciseRoutes from './routes/exerciseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import scoreRoutes from './routes/scoreRoute.js';
const port = process.env.PORT || 8000;
dotenv.config();    

connectDB();

const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/api/exercise',exerciseRoutes);
app.use('/api/users',userRoutes)
app.use('/api/score',scoreRoutes)


app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})