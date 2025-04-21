import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1 className="mb-4">Welcome to GoogleSheet-Importer</h1>
      <div className="d-flex gap-3">
        <Button variant="primary" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
        <Button variant="success" onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </Container>
  );
};

export default Home;
