import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import resetImg from "../../assets/forgot.png";
import Card from "../../components/card/Card";

const Reset = () => {
  return (
    <Container className="auth">
      <Row>
        <Col md={6} className="d-flex align-items-center">
          <Card>
            <div className="form">
              <h2 className="text-center">Reset Password</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email" required />
                </Form.Group>

                <Button variant="primary" type="submit" block>Reset Password</Button>
              </Form>
              <div className="links">
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <img src={resetImg} alt="Reset Password" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Reset;
