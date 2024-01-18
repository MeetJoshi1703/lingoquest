import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <>
      <h1>Welcome to the Language Learning Game</h1>
      <p>Login to play the game. you can <Link to="/login">login here</Link>.</p>
    </>
  );
};

export default HomeScreen;