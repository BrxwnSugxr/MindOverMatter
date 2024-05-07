import React, { useContext } from 'react';
import { GET_USER_REGISTERED_EVENTS } from '../../utils/queries';
import AuthContext from '../../context/AuthContext';
import './Profile.css';
import { useQuery } from '@apollo/client';
import { Card } from 'react-bootstrap';

const Profile = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { data, error: userEventsError } = useQuery(
    GET_USER_REGISTERED_EVENTS,
    {
      variables: {
        userId: loggedInUser?.user?._id,
      },
    }
  );
  console.log('data', data);

  return (
    <div>
      <h4 className="text-center">Hello, {loggedInUser?.user?.username}</h4>
      {!data && !userEventsError && <p className="loading">Loading...</p>}

      {userEventsError && (
        <p className="error-msg">
          Error while getting your registered events. Try again later
        </p>
      )}
      {data?.userRegisteredEvents?.length === 0 ? (
        <p className="error-msg">You don't have any registered events.</p>
      ) : (
        <>
          <h2 className="title">Your Registered Events</h2>
          <div className="events-list">
            {data?.userRegisteredEvents?.map((event) => {
              const {
                _id,
                image,
                description,
                title,
                is_virtual,
                number_of_people,
              } = event?.event || {};
              return (
                <Card className="event" key={_id}>
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
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
