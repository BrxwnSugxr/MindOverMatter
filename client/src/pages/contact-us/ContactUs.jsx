import React, { useState } from 'react';
import './ContactUs.css';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SEND_EMAIL } from '../../utils/mutations';

const ContactUs = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    message: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [sendEmail, { error }] = useMutation(SEND_EMAIL);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const { username, email, message } = state;
    if (
      username.trim() !== '' &&
      email.trim() !== '' &&
      message.trim() !== ''
    ) {
      await sendEmail({
        variables: {
          username,
          email,
          message,
        },
      });
      setSuccessMsg('Email sent successfully.');
      setState({
        username: '',
        email: '',
        message: '',
      });
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    } else {
      setErrorMsg('All the fields are required.');
    }
  };
  return (
    <div className="contact-us">
      <Form onSubmit={handleSubmit}>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        {error && (
          <p className="error-msg">
            Error while sending email. Try again later.
          </p>
        )}
        {successMsg && <p className="success-msg">{successMsg}</p>}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter your name"
            value={state.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={state.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={3}
            placeholder="Type your message"
            value={state.message}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Button type="submit">Send Email</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ContactUs;
