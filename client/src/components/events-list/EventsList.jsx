import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { GET_EVENTS, GET_USER_REGISTERED_EVENTS } from '../../utils/queries';
import { Button, Card } from 'react-bootstrap';
import './EventsList.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  DELETE_EVENT,
  REGISTER_USER_FOR_EVENT,
  UN_REGISTER_USER_FROM_EVENT,
} from '../../utils/mutations';
import AuthContext from '../../context/AuthContext';

const EventsList = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_EVENTS);
  const { data: userEvents, error: userEventsError } = useQuery(
    GET_USER_REGISTERED_EVENTS,
    {
      variables: {
        userId: loggedInUser?.user?._id || loggedInUser?.admin?._id,
      },
    }
  );
  const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT);
  const [registerForEvent, { error: eventError }] = useMutation(
    REGISTER_USER_FOR_EVENT
  );
  const [unRegisterFromEvent, { error: unRegisterError }] = useMutation(
    UN_REGISTER_USER_FROM_EVENT
  );

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (shouldDelete) {
      try {
        await deleteEvent({
          variables: {
            eventId: id,
          },
          refetchQueries: [
            {
              query: GET_EVENTS,
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEventRegistration = async (eventId) => {
    try {
      debugger;
      await registerForEvent({
        variables: {
          eventId,
          userId: loggedInUser?.user?._id,
        },
        refetchQueries: [
          {
            query: GET_USER_REGISTERED_EVENTS,
            variables: {
              userId: loggedInUser?.user?._id,
            },
          },
        ],
      });
      setSuccessMsg('Event registration successful.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEventUnRegistration = async (eventId) => {
    try {
      await unRegisterFromEvent({
        variables: {
          eventId,
          userId: loggedInUser?.user?._id,
        },
        refetchQueries: [
          {
            query: GET_USER_REGISTERED_EVENTS,
            variables: {
              userId: loggedInUser?.user?._id,
            },
          },
        ],
      });
      setSuccessMsg('Event registration removed.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data && !error) {
    return <p className="loading">Loading...</p>;
  }

  if (data?.getEvents?.length === 0) {
    return <p className="error-msg">No events found. Please add some.</p>;
  }

  return (
    <>
      {error && (
        <p className="error-msg">
          Error while getting list of events. Try again later
        </p>
      )}
      {deleteError && (
        <p className="error-msg">Error while deleting event. Try again later</p>
      )}
      {eventError && (
        <p className="error-msg">
          Error while registering for the event. Try again later
        </p>
      )}
      {unRegisterError && (
        <p className="error-msg">
          Error while removing registration from the event. Try again later
        </p>
      )}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <div className="events-list">
        {data?.getEvents?.map(
          ({
            _id,
            title,
            description,
            number_of_people,
            is_virtual,
            image,
          }) => {
            const isUserRegistered = userEvents?.userRegisteredEvents?.find(
              (event) => event.event._id === _id
            );

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
                    {loggedInUser?.admin?.type === 'admin' ? (
                      <div className="action-buttons">
                        <Button onClick={() => navigate(`/event/${_id}`)}>
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleDelete(_id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : isUserRegistered ? (
                      <>
                        <div className="mt-3">
                          ✅You're registered for this event
                        </div>
                        <Button
                          variant="danger"
                          className="mt-2"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleEventUnRegistration(_id);
                          }}
                        >
                          Unregister from event
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="mt-3"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleEventRegistration(_id);
                          }}
                        >
                          Register for this event
                        </Button>
                        <div className="hide mt-2">Hello</div>
                      </>
                    )}
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

export default EventsList;
