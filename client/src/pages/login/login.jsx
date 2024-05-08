import React, { useContext, useState } from 'react';
import './login.css';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../../utils/mutations';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = ({ setIsLoggedIn }) => {
  const { updateLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loginUser, { error }] = useMutation(LOGIN_USER);
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
    const { email, password } = state;
    if (email.trim() !== '' && password.trim() !== '') {
      const { data } = await loginUser({
        variables: {
          ...state,
        },
      });
      console.log('data', data);
      updateLoggedInUser(data?.login);
      localStorage.setItem('user', JSON.stringify(data.login));
      setIsLoggedIn(true);
      setState({
        email: '',
        password: '',
      });
      setSuccessMsg('Login is successful');
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/events-list');
      }, 2000);
    }
  };

  return (
    <div className="login">
      <h2 className="title">Login Page</h2>
      <Form className="login-form" onSubmit={handleSubmit}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {error && (
          <p className="error-msg">
            {error?.message || 'Something went wrong. Try again later.'}
          </p>
        )}
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
        <Button type="submit">Login</Button>
      </Form>
      <div>
        Don't have an account? <Link to="/register">register here</Link>
      </div>
    </div>
  );
};

export default Login;
