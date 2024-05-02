import React, { useState } from 'react';
import './Register.css';
import { Button, Form } from 'react-bootstrap';

const Register = () => {
  return (
    <div className="register">
      <h2 className="title">Register Page</h2>
      <Form className="register-form">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Register;
