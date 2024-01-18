import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetExercisesByLangQuery } from '../slices/exerciseApiSlice';
import { useGetUsersByProfQuery } from '../slices/usersApiSlice';
import { Table } from 'react-bootstrap';

const DisplayExercise = () => {
  const { lang } = useParams();
  const { data, isLoading, error ,refetch} = useGetExercisesByLangQuery(lang);
  const { data: users, isLoading:loadingUser, error:userErr} = useGetUsersByProfQuery(lang);
  
  useEffect(() => {
    refetch();
  }, [lang]);

  if (isLoading) {
    return <div>Loading exercises...</div>;
  }

  if (error) {
    return <div>Error fetching exercises: {error.message}</div>;
  }

  
  if (!data || data.length === 0) {
    return <div>No exercises available for this language.</div>;
  }

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Question</th>
          <th>Difficulty</th>
          <th>Solve</th>
        </tr>
      </thead>
      <tbody>
        {data.map((exercise, index) => (
          <tr key={exercise._id}>
            <td>{index + 1}</td>
            <td>{exercise.type}</td>
            <td>{exercise.question}</td>
            <td>{exercise.difficulty}</td>
            <td>
              <Link to={`/quiz/${exercise._id}`}>Solve</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

     {loadingUser && <div>Loading...</div>}

     {userErr && <div>Error fetching users: {error.message}</div>}

     {users && users.length > 0 && (
       <Table striped bordered hover>
         <thead>
           <tr>
             <th>Rank</th>
             <th>User Name</th>
             <th>Prof Level</th>
           </tr>
         </thead>
         <tbody>
           {users.map((user, index) => (
             <tr key={user._id}>
               <td>{index + 1}</td>
               <td>{user.username}</td>
               <td>{user.proficiencyLevel[lang]}</td>
             </tr>
           ))}
         </tbody>
       </Table>
     )}
     </>
  );
};

export default DisplayExercise;
