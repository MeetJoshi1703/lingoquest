import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetExerciseByIdQuery } from '../slices/exerciseApiSlice';
import { useCompleteExerciseMutation } from '../slices/scoreApiSlice';

import { Card, Button, Form, Alert } from 'react-bootstrap';

const QuizScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isTimerPaused, setIsTimerPaused] = useState(false); // New state variable

  const { data: exerciseData, isLoading, error } = useGetExerciseByIdQuery(id);

  const [completeExercise, { isLoading: loadingSolution }] = useCompleteExerciseMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (exerciseData) {
      setExercise(exerciseData);
      // Show alert when component mounts
      setShowAlert(true);
    }
  }, [exerciseData]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    if (selectedAnswer !== null) {
      try {
        const res = completeExercise({
          id,
          userId: userInfo._id,
          userAnswer: selectedAnswer,
          timeTaken: 30 - timeRemaining,
        });

        if (res === true) {
          alert('Correct Answer !!');
        } else {
          alert(error);
        }
        setTimeRemaining(30);

        // Pause the timer after submitting data
        setIsTimerPaused(true);
      } catch (error) {
        // Handle error if the mutation fails
        console.error('Error completing exercise:', error.message);
      }
    } else {
      // Handle the case where no answer is selected
      console.warn('Please select an answer before submitting.');
    }
  };

  const handleTryAgain = () => {
    setShowAlert(true);
    setTimeRemaining(30);
    setSelectedAnswer(null);
    setIsTimerPaused(false); // Resume the timer when trying again
  };

  const handleGoBack = () => {
    navigate(`/language/${exerciseData.language}`); // Replace with your actual route
  };

  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && !isTimerPaused) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Handle time over logic
      setShowAlert(false);
    }

    return () => clearTimeout(timer);
  }, [timeRemaining, isTimerPaused]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching exercise: {error.message}</div>;
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{exercise?.question}</Card.Title>
          <Form onSubmit={handleAnswerSubmit}>
            {exercise?.choices.map((choice, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={choice}
                id={`choice-${index}`}
                checked={selectedAnswer === choice}
                onChange={() => setSelectedAnswer(choice)}
                disabled={timeRemaining === 0}
              />
            ))}
            <Button type="submit">Submit Answer</Button>
          </Form>
          <div style={{ marginTop: '10px', fontSize: '24px' }}>
            Time Remaining: {timeRemaining} seconds
          </div>
        </Card.Body>
      </Card>

      {timeRemaining === 0 && !showAlert && (
        <Alert variant="danger">
          Time Over! <Button onClick={handleTryAgain}>Try Again</Button>
          <Button onClick={handleGoBack}>Go Back</Button>
        </Alert>
      )}
    </div>
  );
};

export default QuizScreen;
