import React  from "react";
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-domdark d-flex justify-content-center
const Header = () => {

  return (
    <>    
      <Container fluid>
        <Row>
          <Col className="bg-dark d-flex justify-content-center">
          <h1 style={{color:"white"}}>Manage Task With<span style={{ color: "red" }}> GoogleSheet</span></h1>
          </Col>
        </Row>
      </Container>
  </>
  );
};
export default Header;
