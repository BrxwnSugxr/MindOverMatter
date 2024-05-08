import React, { useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/header/Header';
import ProtectedPage from './components/protected-page/ProtectedPage';
import EventsList from './components/events-list/EventsList';
import UpdateEvent from './components/update-event/UpdateEvent';
import Home from './pages/home/Home';
import EventInfo from './components/event-info/EventInfo';
import AdminLogin from './pages/admin-login/AdminLogin';
import AdminRegister from './pages/admin-register/AdminRegister';
import AuthContext from './context/AuthContext';
import Donate from './pages/donate/Donate';
import Success from './success/Success';
import Profile from './pages/profile/Profile';
import ContactUs from './pages/contact-us/ContactUs';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';

const App = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') ? true : false
  );
  return (
    <BrowserRouter>
      <div className="container">
        <div className="main-content">
          {' '}
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/events-list" />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/events-list" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isLoggedIn ? <Register /> : <Navigate to="/events-list" />
              }
            />
            <Route
              path="/register_admin"
              element={
                !isLoggedIn ? <AdminRegister /> : <Navigate to="/events-list" />
              }
            />
            <Route
              path="/admin_login"
              element={
                !isLoggedIn ? (
                  <AdminLogin setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/events-list" />
                )
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/success" element={<Success />} />
            <Route
              path="/event/:id"
              element={
                isLoggedIn && loggedInUser?.type === 'admin' ? (
                  <UpdateEvent />
                ) : (
                  <EventInfo />
                )
              }
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route element={<ProtectedPage isLoggedIn={isLoggedIn} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {loggedInUser?.user?._id && (
                <Route path="/profile" element={<Profile />} />
              )}
              <Route path="/events-list" element={<EventsList />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
