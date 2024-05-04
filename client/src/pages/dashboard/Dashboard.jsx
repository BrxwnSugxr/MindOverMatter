import React from 'react';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  const { data, loading } = userQuery(GET_USER);
  console.log('Dashboard data', data);
  return (
    <div>
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
    </div>
  );
};

export default Dashboard;
