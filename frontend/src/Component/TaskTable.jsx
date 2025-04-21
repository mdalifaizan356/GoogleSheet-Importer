import React, { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';
import { Table, Button, ButtonGroup, Form, Modal } from 'react-bootstrap';

const TaskTable = ({ setRefreh, refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({Title: '', Description: '', DueDate: ''});
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axiosInstance.get(`/taskroutes/alltasks`);
        if (response.status === 200) {
          setTasks(response.data.tasks);
        }
      } catch (error) {
        console.error('Error on fetch product:', error);
        toast.error('Failed to fetch tasks. Please try again.');
      }
    };

    fetchAllTasks();
  }, [refresh]);


  const fetchSingleTask = async (taskId) => {
    try {
      const response = await axiosInstance.get(`/taskroutes/singletask/${taskId}`);
      if (response.status === 200) {
        const task = response.data.task;
        setFormData({Title: task.Title, Description: task.Description, DueDate: task.DueDate?.substring(0, 10)});
        setEditingTaskId(taskId);
        setShow(true);
      }
    } catch (error) {
      console.error('Error on fetch single task:', error);
      toast.error('Failed to fetch task. Please try again.');
    }
  };

  const updateTask = async () => {
    try {
      const response = await axiosInstance.put(`/taskroutes/updatetask/${editingTaskId}`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        setRefreh(prev => !prev);
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/taskroutes/deletetask/${taskId}`);
      if (response.status === 200) {
        setRefreh((prev) => !prev);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task.');
    }
  };

  const completeTask = async (taskId) => {
    try {
      const response = await axiosInstance.patch(`/taskroutes/changestatus/${taskId}`);
      if (response.status === 200) {
        setRefreh((prev) => !prev);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task.');
    }
  };

  return (
    <>
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th style={{ minWidth: '160px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No tasks found.
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.Title}</td>
              <td>{task.Description}</td>
              <td>{task.DueDate?.substring(0, 10)}</td>
              <td>{task.Status}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button variant="warning" onClick={() => fetchSingleTask(task._id)}>
                    ✏️ Edit
                  </Button>
                  {/* <Button variant="success" onClick={handleShow}>
                  ✏️ Edit
                  </Button> */}
                  <Button variant="danger" onClick={() => deleteTask(task._id)}>
                    🗑️ Delete
                  </Button>
                  <Button variant="success" onClick={() => completeTask(task._id)}>
                    ✔️ Done
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="Title" value={formData.Title} placeholder="Enter title" onChange={handleChange} />
          </Form.Group>
        
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="Description" value={formData.Description} placeholder="Enter description" onChange={handleChange} />
          </Form.Group>
        
          <Form.Group controlId="formDueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="DueDate" value={formData.DueDate} onChange={handleChange} />
          </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={updateTask}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
</>
  );
};

export default TaskTable;
