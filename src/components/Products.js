// src/components/Products.js
import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Alert } from 'react-bootstrap';
import { useMessage } from './MessageContext';  // Import the hook
import { useNavigate } from 'react-router-dom';

function Products(){
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { message, error, setMessage, setError, clearMessage  } = useMessage();
    const API_KEY = process.env.REACT_APP_API_KEY;

    // start
    // end

    const handleRefetch = async (url) => {
        try {
            const response = await fetch('http://localhost:3000/products/import', { // Replace with your Rails API endpoint
                method: 'POST',
                headers: {
                    'Trip-Api-Key': API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                }),
            });

            if (response.ok) {
                setMessage('Refecthing of this product initiated.');
                navigate('/'); // Redirect to home
            } else {
                setMessage(null);
            setError(response.statusText + ': ' + url);
            navigate('/');
            }
        } catch (error) {
            setMessage(null); // Clear any previous messages
            setError(error);
            navigate('/');
        }
    };
 
  useEffect(() => {
      fetch("http://localhost:3000/products", {
          headers: {
              'Trip-Api-Key': API_KEY,
          'Content-Type': 'application/json',
          }
      })
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [message, error, clearMessage]);

    return (
            <div>
            <h1>Products</h1>
            {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
            {products && products.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Scraped At</th>
                    <th>Status</th>
                    <th>Error</th>
          <th>Image</th>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Currency</th>
          <th>Source URL</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Rating</th>
          <th>Review Count</th>
          <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.scraped_at}</td>
                        <td>{product.status ? 'Success' : 'Failed'}</td>
                        <td>{product.error}</td>
                        <td><img src={product.image_url} width='80%'/></td>
                        <td>{product.id}</td>
                        <td>{product?.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td>{product.currency}</td>
                        <td>{product.source_url}</td>
                        <td>{product.category?.name}</td>
                        <td>{product.brand?.name}</td>
                        <td>{product.rating}</td>
                        <td>{product.review_count}</td>
                        <td><Button variant="primary" onClick={() => handleRefetch(product.source_url)}>Refetch</Button></td>
                    </tr>
                ))}
            </tbody>
                    </Table>
            ) : (
                    <Alert key='danger' variant='danger'>No Products to Display</Alert>
            )};
      </div>
  );
};

export default Products;
