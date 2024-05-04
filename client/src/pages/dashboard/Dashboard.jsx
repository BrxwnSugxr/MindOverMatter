import React from 'react';

const Dashboard = () => {
  const { data, loading } = userQuery(GET_USER);
  console.log('Dashboard data', data);
  return <div>Dashboard</div>;
};

export default Dashboard;
