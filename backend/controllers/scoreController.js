import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import Exercise from "../models/exerciseModel.js";
import Score from "../models/scoreModel.js";


// Controller to complete an exercise - updates the score when user submits right answer
const completeExercise = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id;
  const { userAnswer, timeTaken, userId } = req.body;

  try {
    // Retrieve the exercise and user objects
    const exercise = await Exercise.findById(exerciseId);
    const user = await User.findById(userId);

    // Check if the exercise ID is valid
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    const existingScore = await Score.findOne({ userId, exercise: exerciseId });

    // Check if the user has already completed this exercise
    if (existingScore) {
      return res.json({ isCorrect: true, alreadyCompleted: true })
    }

    // Compare the user's answer with the actual answer
    const isCorrect = userAnswer === exercise.answer;

    // Update the user's progress and score if the answer is correct
    if (isCorrect) {
      // Function to update proficiency based on difficulty and time taken
      const proficiencyIncrement = calculateProficiencyIncrement(timeTaken, exercise.difficulty);
      const currentProficiency = user.proficiencyLevel.get(exercise.language) || 0;
      user.proficiencyLevel.set(exercise.language, currentProficiency + proficiencyIncrement);
      await user.save();

      // Create a new Score document
      const newScore = new Score({
        userId,
        exercise: exerciseId,
        timeTaken,
      });

      // Save the new Score document
      await newScore.save();

      // Return a response indicating that the answer is correct
      res.json({ isCorrect: true });;
    } else {
      // Return a response indicating that the answer is incorrect
      res.json({ isCorrect: false });;
    }

  } catch (error) {
    console.error('Error completing exercise:', error);
    res.status(500).json({ message: 'Failed to complete exercise' });
  }
});
  
const resetUserExercise = asyncHandler(async (req, res) => {

    const userId = req.params.id;
  
    try {
      
      const user = await User.findById(userId);
  
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find and delete all Score records with the given user ID
      // Reset the proficiency map to 0
      user.proficiencyLevel = new Map();

      await user.save();
      
      const deletedScores = await Score.deleteMany({ userId });
  
      res.json({ message: `Successfully reset exercises for user ${userId}. Deleted ${deletedScores.deletedCount} scores.` });

    } catch (error) {
      console.error('Error resetting user exercises:', error);
      res.status(500).json({ message: 'Failed to reset user exercises' });
    }
  });
  

//function to calculate proficiency 
const calculateProficiencyIncrement = (timeTaken, exerciseDifficulty) => {
  
    const maxTime = 30;
    const minProficiencyIncrement = 0.5; 
    const maxProficiencyIncrement = 2; 
  
    // Calculate a linear progression of proficiency increment based on time
    const timeBasedIncrement = minProficiencyIncrement + (maxProficiencyIncrement - minProficiencyIncrement) * (1 - timeTaken / maxTime);
  
    // Adjust the proficiency increment based on exercise difficulty
    const difficultyMultiplier = exerciseDifficulty; // You can adjust this multiplier based on your specific requirements
  
    // Combine time-based and difficulty-based increments
    const combinedIncrement = timeBasedIncrement * difficultyMultiplier;
  
    return combinedIncrement;
  };




  export {
    completeExercise,
    resetUserExercise
  }