import mongoose from "mongoose";


const exerciseSchema = mongoose.Schema({
   // Type of exercise, e.g., "Multiple Choice", "FillInTheBlanks","Translation" etc.
  type: {
    type: String,
    required: true,
  },
  // Difficulty level of the exercise (1 to 5)
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
   //language code associated with the exercise e.g., en-english,fr-french etc.
  language: {
    type: String,
    required: true,
  },
  // The text of the exercise question
  question: {
    type: String,
    required: true,
  },
  // Description of the exercise (optional)
  descripton:{
    type:String
  },
  // The correct answer to the exercise (if applicable)
  answer: {
    type: String,
  }, 
  // Array of choices for multiple-choice exercises
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
