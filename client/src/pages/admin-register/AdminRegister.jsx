import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_ADMIN } from '../../utils/mutations';
import './AdminRegister.css';

const AdminRegister = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [registerAdmin, { error }] = useMutation(REGISTER_ADMIN);
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
      const { data } = await registerAdmin({
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
        navigate('/admin_login');
      }, 2000);
    }
  };

  return (
    <div className="register">
      <h2 className="title">Create Admin Account</h2>
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
        Already have an account? <Link to="/admin_login">login here</Link>
      </div>
    </div>
  );
};

export default AdminRegister;
