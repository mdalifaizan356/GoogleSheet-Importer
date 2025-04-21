import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from './../lib/axios';
import { toast } from "react-hot-toast";

const ForgetPass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Name: '', Email: '', OTP: '', Password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!formData.Email) {
      toast.error("Enter Valid Email");
      return;
    }
    try {
      const response = await axiosInstance.post(`/authroute/sendotp`, { Email: formData.Email });
      if (response.status === 200) {
        toast.success("OTP sent to your email");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/authroute/signup`, formData);
      if (response.status === 200) {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error on registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Recover Password</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Row>
                <Col xs={8}>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col xs={4}>
                  <Button variant="info" onClick={handleSendOtp} className="w-100">
                    Verify Email
                  </Button>
                </Col>
              </Row>
            </Form.Group>

              <Form.Group className="mb-3" controlId="formOTP">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  name="OTP"
                  value={formData.OTP}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Change Password
              </Button>

              <p className="mt-3 text-center">
              If Remembered Password <Link to="/login" style={{color:"red"}}>Login</Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPass;
