import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import Exercise from "../models/exerciseModel.js";
import Score from "../models/scoreModel.js";


// Controller to complete an exercise
const completeExercise = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming you use authentication middleware
  const exerciseId = req.params.id;
  const { userAnswer, timeTaken } = req.body; // Assuming the client sends the user's answer and time taken in the request body

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
      return res.status(400).json({ message: 'Exercise already completed by the user' });
    }

    // Compare the user's answer with the actual answer
    const isCorrect = userAnswer === exercise.answer;

    // Update the user's progress and score if the answer is correct
    if (isCorrect) {
      // Update the user's proficiency level (assuming you have a proficiency system)
      const proficiencyIncrement = calculateProficiencyIncrement(timeTaken,exercise.difficulty);
      const currentProficiency = user.proficiencyLevel.get(exercise.language) || 0;
      user.proficiencyLevel.set(exercise.language, currentProficiency+proficiencyIncrement);
        
      await user.save();


      // Create a new Score document
      const newScore = new Score({
        userId,
        exercise: exerciseId,
        timeTaken,
      });

      // Save the new Score document
      await newScore.save();
    }

    // Return a response indicating whether the answer was correct
    res.json({ message: isCorrect ? 'Correct answer! Exercise completed successfully' : 'Incorrect answer' });
  } catch (error) {
    console.error('Error completing exercise:', error);
    res.status(500).json({ message: 'Failed to complete exercise' });
  }
});

const calculateProficiencyIncrement = (timeTaken, exerciseDifficulty) => {
    // Your logic for calculating proficiency increment based on time and exercise difficulty goes here
    // This is just a simple example; adjust it based on your actual scoring system
    const maxTime = 60; // Maximum time allowed in seconds
    const minProficiencyIncrement = 0.5; // Minimum proficiency increment
    const maxProficiencyIncrement = 2; // Maximum proficiency increment
  
    // Calculate a linear progression of proficiency increment based on time
    const timeBasedIncrement = minProficiencyIncrement + (maxProficiencyIncrement - minProficiencyIncrement) * (1 - timeTaken / maxTime);
  
    // Adjust the proficiency increment based on exercise difficulty
    const difficultyMultiplier = exerciseDifficulty; // You can adjust this multiplier based on your specific requirements
  
    // Combine time-based and difficulty-based increments
    const combinedIncrement = timeBasedIncrement * difficultyMultiplier;
  
    return combinedIncrement;
  };
  





  export {
    completeExercise
  }