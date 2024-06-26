import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { LOGIN_ADMIN } from '../../utils/mutations';
import './AdminLogin.css';

const AdminLogin = ({ setIsLoggedIn }) => {
  const { updateLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loginAdmin, { error }] = useMutation(LOGIN_ADMIN);
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
    const { email, password } = state;
    if (email.trim() !== '' && password.trim() !== '') {
      const { data } = await loginAdmin({
        variables: {
          ...state,
        },
      });
      updateLoggedInUser(data?.loginAdmin);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data.loginAdmin));
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
      <h2 className="title">Admin Login Page</h2>
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
        Don't have an admin account?{' '}
        <Link to="/register_admin">register here</Link>
      </div>
    </div>
  );
};

export default AdminLogin;
