import React, { useState } from 'react';
import './Register.css';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registerUser, { error }] = useMutation(REGISTER_USER);
  const [sucessMsg, setSuccessMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state);

    const { data } = await registerUser({
      data: {
        ...state,
      },
    });
    console.log('data', data);
    setState({
      username: '',
      email: '',
      password: '',
    });
    setSuccessMsg('Registration is succesful');
    setTimeout(() => {
      setSuccessMsg('');
    }, 2000);
  };
  return (
    <div className="register">
      <h2 className="title">Register Page</h2>
      {sucessMsg && <p className="success-msg">{sucessMsg}</p>}
      {error && (
        <p className="error-msg">
          Something went wrong, please try again later.
        </p>
      )}
      <Form className="register-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Register;
