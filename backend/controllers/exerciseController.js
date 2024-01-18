import asyncHandler from '../middlewares/asyncHandler.js';
import Exercise from '../models/exerciseModel.js';

// Get exercises by language
const getExerciseByLang = asyncHandler(async (req, res) => {
  const language = req.params.lang; // Get language from query parameters

  try {
    const exercises = await Exercise.find({ language }).select('-answer');
    res.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Failed to fetch exercises' });
  }

});

// Get exercise by ID
const getExerciseById = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id; // Get exercise ID from the request parameters

  try {
    const exercise = await Exercise.findById(exerciseId).select('-answer');

    if (!exercise) {
      // If exercise with the given ID is not found, return a 404 response
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json(exercise);
    
  } catch (error) {
    console.error('Error fetching exercise by ID:', error);
    res.status(500).json({ message: 'Failed to fetch exercise by ID' });
  }
});

// Get exercises by difficulty
const getExercisesByDifficulty = asyncHandler(async (req, res) => {
  const difficulty = req.params.difficulty;

  try {
    // Retrieve exercises by difficulty
    const exercises = await Exercise.find({ difficulty: difficulty });
    res.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises by difficulty:', error);
    res.status(500).json({ message: 'Failed to fetch exercises by difficulty' });
  }
});

// Create a new exercise
const createExercise = asyncHandler(async (req, res) => {
  const exerciseData = req.body;
  try {
    const newExercise = await Exercise.create(exerciseData);
    res.status(201).json(newExercise);
  } catch (error) {
    console.error('Error creating exercise:', error);
    res.status(500).json({ message: 'Failed to create exercise' });
  }
});

// Update an existing exercise
const updateExercise = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(exerciseId, updatedData, { new: true });
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(updatedExercise);
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({ message: 'Failed to update exercise' });
  }
});

// Delete an exercise
const deleteExercise = asyncHandler(async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ message: 'Failed to delete exercise' });
  }
});

// Exporting the functions for use in other files
export {
  getExerciseByLang,
  getExerciseById,
  getExercisesByDifficulty,
  createExercise,
  updateExercise,
  deleteExercise
};
