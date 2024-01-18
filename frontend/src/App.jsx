import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
return(
  <>
    <Header/>
    <main className='py-3'  style={{ marginTop: '80px'}} >
    <Container>
      <Outlet />
    </Container>
    </main>
  </>
);
  
}

export default App