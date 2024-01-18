import mongoose from 'mongoose';

//function to establish a connection to the MongoDB database
const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connection successful ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;