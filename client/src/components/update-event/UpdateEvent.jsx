import React, { useContext } from 'react';
import EventForm from '../event-form/EventForm';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT, GET_EVENTS } from '../../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UPDATE_EVENT } from '../../utils/mutations';
import AuthContext from '../../context/AuthContext';

const UpdateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error } = useQuery(GET_EVENT, {
    variables: { eventId: id },
  });
  const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT);

  const handleUpdate = async (id, updates) => {
    try {
      await updateEvent({
        variables: {
          eventId: id,
          input: {
            ...updates,
          },
        },
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  if (!data && !error) {
    return <p className="loading">Loading...</p>;
  }
  return (
    <div>
      {error && <p className="error-msg">Error while getting event details.</p>}
      {updateError && (
        <p className="error-msg">Error while updating event details..</p>
      )}
      <Link to="/">Back to home</Link>
      <EventForm handleSubmit={handleUpdate} event={data?.getEvent} />
    </div>
  );
};

export default UpdateEvent;
