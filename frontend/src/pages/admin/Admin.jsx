import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/admin/home/Home";
import Profile from "../../components/admin/profile/Profile";
import Sub from "../../components/admin/subscription/Sub";

const Admin = () => {
  return (
    <Container fluid className="admin">
      <Row>
        <Col sm={3} className="navbar">
          <Sidebar />
        </Col>
        <Col sm={9} className="content">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="account" element={<Sub />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
