import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//Usermodel to store information necessary for authentication 
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
  },
  //key:value pairs to store user proficiency in each language e.g., en:2.5 , es:1 , fr:2 etc
  proficiencyLevel: {
    type: Map,
    of: Number,
    default: {},
  },
});

// Method to compare entered password with the stored hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save',async function (next){
  if(!this.isModified('password')){
      next();
  }

   // Generate a salt and hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password,salt); 
})


const User = mongoose.model('User', userSchema);

export default User;
