import React, { useState } from 'react';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';
import { Form, Button } from 'react-bootstrap';

const AddTask = ({ setRefreh }) => {
  const [formData, setFormData] = useState({Title: '', Description: '', DueDate: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/taskroutes/createtask`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        setRefreh((prev) => !prev);
        setFormData({ Title: '', Description: '', DueDate: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add task');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="Title"
          value={formData.Title}
          placeholder="Enter title"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="Description"
          value={formData.Description}
          placeholder="Enter description"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formDueDate" className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="DueDate"
          value={formData.DueDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default AddTask;
