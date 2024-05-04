import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { data, loading } = userQuery(GET_USER);
  console.log('Dashboard data', data);
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: '',
    description: '',
    number_of_people: '',
    isVirtual: false,
  });

  const [createEvent, { error }] = useMutation(CREATE_EVENT);
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
      const { data } = await createEvent({
        data: {
          ...state,
        },
      });
      console.log('data', data);
      setState({
        title: '',
        description: '',
        number_of_people: '',
        isVirtual: false,
      });
      setSuccessMsg('Event created successful');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    }
  };

  return (
    <div className="login">
      <h2 className="title">Login Page</h2>
      <Form className="login-form" onSubmit={handleSubmit}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {error && (
          <p className="error-msg">Something went wrong.Try again later</p>
        )}

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="title"
            name="title"
            placeholder="Enter title"
            value={state.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            description="description"
            placeholder="Enter description"
            value={state.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
      <div>
        Don't have an account <Link to="/register">register here</Link>
      </div>
    </div>
  );
};

export default Dashboard;
