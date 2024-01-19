import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../slices/usersApiSlice';
import { useGetCompletedExercisesByUserQuery } from '../slices/scoreApiSlice';
import { Table } from 'react-bootstrap';

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [completedExercises, setCompletedExercises] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userData, error: userError } = useGetUserByIdQuery(userInfo?._id);
  const { data: completedData, error: completedError } = useGetCompletedExercisesByUserQuery(
    userInfo?._id
  );

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
    if (userError) {
      console.error('Error fetching user data:', userError);
    }
  }, [userData, userError]);

  useEffect(() => {
    if (completedData) {
      setCompletedExercises(completedData.completedExercises);
    }
    if (completedError) {
      console.error('Error fetching completed exercises:', completedError);
    }
  }, [completedData, completedError]);

  return (
    <div>
      {user._id ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          {user.proficiencyLevel && (
            <div>
              <h3>Proficiency in Languages:</h3>
              <ul>
                {Object.entries(user.proficiencyLevel).map(([language, proficiency]) => (
                  <li key={language}>
                    {language}: {proficiency}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {completedExercises.length > 0 && (
            <div>
              <h3>Completed Exercises:</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Exercise Type</th>
                    <th>Difficulty</th>
                    <th>Language</th>
                    <th>Question</th>
                    <th>Time Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {completedExercises.map((exercise) => (
                    <tr key={exercise._id}>
                      <td>{exercise.exercise.type}</td>
                      <td>{exercise.exercise.difficulty}</td>
                      <td>{exercise.exercise.language}</td>
                      <td>{exercise.exercise.question}</td>
                      <td>{exercise.timeTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
