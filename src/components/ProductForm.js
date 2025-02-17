import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useMessage } from './MessageContext';

function ProductForm() {
  const [formData, setFormData] = useState('');
  const navigate = useNavigate();
  const { message, error, setMessage, setError, clearMessage } = useMessage();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleSubmit = async (e) => {
      e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/products/import', {
        method: 'POST',
            headers: {
                'Trip-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formData }),
      });

        if (response.ok) {
            setError(null);
            setMessage('Product import has been initiated');
            navigate('/'); // Redirect to home
        } else {
            setMessage(null);
            setError(response.statusText + ': ' + formData);
            navigate('/');
      }
    } catch (error) {
        setMessage(null); // Clear any previous messages
        setError(error);
        navigate('/');
    }
  };

  return (
    <div>
      <h1>Fetch New Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label>Enter URL:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProductForm;
