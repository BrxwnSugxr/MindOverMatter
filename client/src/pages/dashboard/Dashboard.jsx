import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AddEvent from '../../components/add-event/AddEvent';
import AuthContext from '../../context/AuthContext';

const Dashboard = () => {
  const { loggedInUser } = useContext(AuthContext);
  if (loggedInUser?.admin?.type !== 'admin') {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <AddEvent />
    </div>
  );
};

export default Dashboard;
