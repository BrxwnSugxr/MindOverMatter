import { useMutation } from '@apollo/client';
import React from 'react';
import { CREATE_EVENT, UPLOAD_IMAGE } from '../../utils/mutations';
import { GET_EVENTS } from '../../utils/queries';
import EventForm from '../event-form/EventForm';

const AddEvent = () => {
  const [createEvent, { error }] = useMutation(CREATE_EVENT);
  const [uploadImage, { error: uploadError }] = useMutation(UPLOAD_IMAGE, {
    onCompleted: (data) => console.log('uploaded', data),
  });

  const handleSubmit = async (updates) => {
    const { title, description, number_of_people, file, event_date } = updates;
    let eventId = '';
    try {
      if (
        title.trim() !== '' &&
        description.trim() !== '' &&
        number_of_people.trim() !== '' &&
        event_date !== ''
      ) {
        const { file, ...rest } = updates;
        const { data } = await createEvent({
          variables: {
            eventInput: {
              ...rest,
            },
          },
          refetchQueries: [
            {
              query: GET_EVENTS,
            },
          ],
        });
        eventId = data?.createEvent?._id;
      }
      if (file) {
        try {
          await uploadImage({
            variables: {
              file,
              eventId,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div>
      {error && <p className="error-msg">Error while adding event.</p>}
      <EventForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddEvent;
