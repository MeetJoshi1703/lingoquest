import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import {useParams, Link } from 'react-router-dom';
import { useGetUsersByProfQuery } from '../slices/usersApiSlice';
const LanguageScreen = () => {

  // Dummy languages for now
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    // Add more languages as needed
  ];



  const handleLanguageSelect = (selectedLanguage) => {
    // You can perform actions based on the selected language, such as storing it in state or redirecting to another screen.
    // For now, let's navigate to a hypothetical SelectLanguage screen with the language code in the URL.
    // You would replace this with the actual API call logic.
    // Example: `/select-language/en`
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
                {/* Use React Router's Link component to navigate */}
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
