import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  language: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  descripton:{
    type:String
  },
  answer: {
    type: String,
  }, 
  choices: [
    {
      type: String,
    },
  ], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
