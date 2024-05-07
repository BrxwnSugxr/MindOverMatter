import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_EVENT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Button, ListGroup } from 'react-bootstrap';

const EventInfo = () => {
  const { id } = useParams();
  const { data, error } = useQuery(GET_EVENT, {
    variables: { eventId: id },
  });
  const navigate = useNavigate();

  const event = data?.getEvent;

  if (!data && !error) {
    return <p className="loading">Loading...</p>;
  }
  return (
    <div>
      <h2 className="title m-3">Event Information</h2>
      <div
        style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}
      >
        <Link
          to="/"
          className="text-center m-3"
          style={{ margin: '2rem auto', display: 'block' }}
        >
          Back to Events List
        </Link>
        <img
          src={event?.image}
          style={{ width: 350, height: 350, marginBottom: '1rem' }}
        />
        <ListGroup style={{ textAlign: 'left' }}>
          <ListGroup.Item>
            <h2 className="text-center">{event?.title}</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            {' '}
            <strong>Event Date: </strong>
            {new Date(event?.event_date).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              <strong>{event?.description}</strong>
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              <strong>Event Capacity:</strong> {event?.number_of_people}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              <strong>Is Virtual Event:</strong>{' '}
              {'' + event?.is_virtual ? 'Yes' : 'No'}
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default EventInfo;
