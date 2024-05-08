import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainImage from '../../assets/main_image.jpg';
import PublicEvents from '../../components/public-events/PublicEvents';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <img src={MainImage} alt="Main Image" className="main-image" />
      <div className="donate">
        <Button onClick={() => navigate('/donate')}>Donate For Cause</Button>
      </div>
      <div className="public-events">
        <h2 className="title">List of Events</h2>
        <PublicEvents />
      </div>
    </div>
  );
};

export default Home;
