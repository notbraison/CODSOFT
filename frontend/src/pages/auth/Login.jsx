import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";

const Login = () => {
  return (
    <Container className="auth">
      <Row>
        <Col md={6} className="d-flex align-items-center">
          <Card>
            <div className="form">
              <h2 className="text-center">Login</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit" block>Login</Button>
              </Form>
              <p className="text-center">-- or --</p>
              <Button variant="danger" block>
                Login With Google
              </Button>
              <div className="register">
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <img src={loginImg} alt="Login" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
