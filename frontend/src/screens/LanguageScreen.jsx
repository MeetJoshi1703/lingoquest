import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import {useParams, Link } from 'react-router-dom';
import { useGetUsersByProfQuery } from '../slices/usersApiSlice';
const LanguageScreen = () => {


  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    
  ];



  const handleLanguageSelect = (selectedLanguage) => {
    
    console.log(`Selected Language: ${selectedLanguage}`);
  };

  return (
    <Container>
      <h1>Select a Language</h1>
      <Row>
        {languages.map((language) => (
          <Col key={language.code} md={4}>
            <Card style={{ width: '18rem', margin: '10px' }}>
              <Card.Body>
                <Card.Title>{language.name}</Card.Title>
                
                <Link to={`/language/${language.code}`}>
                  <Button
                    variant="primary"
                    onClick={() => handleLanguageSelect(language.code)}
                  >
                    Select
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LanguageScreen;
