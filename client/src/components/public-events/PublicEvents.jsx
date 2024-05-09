import { useQuery } from '@apollo/client';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { GET_PUBLIC_EVENTS } from '../../utils/queries';
import './PublicEvents.css';

const PublicEvents = () => {
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_PUBLIC_EVENTS);

  if (!data && !error) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      {error && (
        <p className="error-msg">
          Error while getting list of events. Try again later
        </p>
      )}

      <div className="events-list">
        {data?.getPublicEvents?.map(
          ({
            _id,
            title,
            description,
            number_of_people,
            is_virtual,
            image,
          }) => {
            return (
              <Link to={`/event/${_id}`} className="link" key={_id}>
                <Card className="event">
                  <Card.Img variant="top" src={image} className="image" />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div>
                      <div>{description}</div>
                      <div>Event Capacity: {number_of_people}</div>
                      <div>Is Virtual: {'' + is_virtual}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            );
          }
        )}
      </div>
    </>
  );
};

export default PublicEvents;
