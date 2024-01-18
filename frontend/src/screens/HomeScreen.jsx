import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <h1>Welcome to the Language Learning Game</h1>
      {userInfo?(
        <p>Select which Language you want to learn <Link to="/select-language"> here</Link></p>
      ):(
        <p>Login to play the game. you can <Link to="/login">login here</Link>.</p>
      )}
      
    </>
  );
};

export default HomeScreen;