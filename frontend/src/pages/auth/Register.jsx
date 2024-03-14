import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";

const Register = () => {
  return (
    <Container className="auth">
      <Row>
        <Col md={6}>
          <Card>
            <div className="form">
              <h2 className="text-center">Register</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Control type="password" placeholder="Confirm Password" required />
                </Form.Group>

                <Button variant="primary" type="submit" block>Register</Button>
              </Form>
              <div className="register">
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <img src={registerImg} alt="Register" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
