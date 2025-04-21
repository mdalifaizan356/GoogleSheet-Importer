import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskTable from '../Component/TaskTable';
import AddTask from '../Component/AddTask';
import ImportTask from '../Component/ImportTask';
import Header from './../Component/Header';

const ManageTask = () => {
  const [refresh, setRefreh] = useState(true);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          {/* Left Side - Forms */}
          <Col md={4}>
            <Card className="mb-3">
              <Card.Header className="bg-primary text-white">📥 Import Tasks</Card.Header>
              <Card.Body>
                <ImportTask setRefreh={setRefreh} refresh={refresh} />
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="bg-success text-white">➕ Add New Task</Card.Header>
              <Card.Body>
                <AddTask setRefreh={setRefreh} refresh={refresh} />
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Task Table */}
          <Col md={8}>
            <Card>
              <Card.Header className="bg-dark text-white">📋 All Tasks</Card.Header>
              <Card.Body>
                <TaskTable setRefreh={setRefreh} refresh={refresh} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageTask;
