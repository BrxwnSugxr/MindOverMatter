import React, { useState } from 'react';
import './Register.css';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

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
    console.log(state);
    const {username, email, password} = state;
    if(username.trim() !== '' && email.trim() !== '' && password.trim() !== ''){

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
      setSuccessMsg('Registration is successful');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    }
  };

  return (
    <div className="register">
      <h2 className="title">Register Page</h2>
      <Form className="register-form" onSubmit={handleSubmit}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {error && (
          <p className="error-msg">Something went wrong.Try again later</p>
        )}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
            value={state.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Enter Email"
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
        have an account <Link to="/login">login in</Link>
      </div>
    </div>
  );
};

export default Register;
