import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from './../lib/axios';
import { toast } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({Email:'', Password:''});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/authroute/login`, formData);
      if(response.status===200){
        toast.success("Login successful");
        navigate("/managetask");
      }
    }
    catch (error) {
      console.error("Error on registration:", error);
      toast.error("Failed to Registration. Please try again."); 
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Log In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>

              <p className="mt-3 text-center">
                New User? <Link to="/signup" style={{ color: "red" }}>Register Now</Link>
              </p>
              <p className="mt-3 text-center">
                <Link to="/forgetpass" style={{ color: "red" }}>Forget Password ?</Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
