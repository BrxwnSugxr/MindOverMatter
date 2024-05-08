import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../../utils/mutations';
import './Register.css';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [registerUser, { error }] = useMutation(REGISTER_USER);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = state;
    if (
      username.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== ''
    ) {
      const { data } = await registerUser({
        variables: {
          ...state,
        },
      });
      setState({
        username: '',
        email: '',
        password: '',
      });
      setSuccessMsg('Registration is successful');
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="register main-form">
      <h2 className="title">Create Your Account</h2>
      <Form className="register-form" onSubmit={handleSubmit}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {error && (
          <p className="error-msg">Something went wrong. Try again later.</p>
        )}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
      <div>
        Already have an account? <Link to="/login">login here</Link>
      </div>
    </div>
  );
};

export default Register;
