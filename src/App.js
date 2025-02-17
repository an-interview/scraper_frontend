import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import ProductForm from './components/ProductForm';
import Products from './components/Products';

function App() {
    return (
          <div className="App">
          <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Web Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/form">Fetch Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/form" element={<ProductForm />} />
      </Routes>
          </div>
  );
}

export default App;
