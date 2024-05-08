import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useNavigate } from 'react-router-dom';
import { validateImage } from '../../utils/function';

const EventForm = ({ event, handleSubmit }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: event ? event.title : '',
    description: event ? event.description : '',
    event_date: event ? event.event_date : new Date(),
    number_of_people: event ? event.number_of_people : '',
    is_virtual: event ? event.is_virtual : false,
    file: null,
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target || {};
    setErrorMsg('');
    debugger;
    if (name === 'file') {
      const file = event.target.files[0];
      const imageErrorMsg = validateImage(file);
      if (imageErrorMsg) {
        setErrorMsg(imageErrorMsg);
      }
      setState({
        ...state,
        file,
      });
    } else if (event instanceof Date) {
      setState({
        ...state,
        event_date: event,
      });
    } else {
      setState({
        ...state,
        [name]: name === 'is_virtual' ? event.target.checked : value,
      });
    }
  };

  const handleFormSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const { title, description, number_of_people, event_date } = state;
    setErrorMsg('');
    if (
      title.trim() !== '' &&
      description.trim() !== '' &&
      number_of_people !== '' &&
      event_date !== ''
    ) {
      if (!event) {
        // add event code
        const isSuccess = await handleSubmit(state);
        if (isSuccess) {
          setState({
            title: '',
            description: '',
            number_of_people: '',
            is_virtual: false,
            event_date: new Date(),
          });
          setSuccessMsg('Event is created successfully');
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/events-list');
          }, 2000);
        }
      } else {
        //edit event code
        const isSuccess = await handleSubmit(event._id, state);
        if (isSuccess) {
          setSuccessMsg('Event updated successfully');
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/events-list');
          }, 2000);
        }
      }
    } else {
      setErrorMsg('All the fields are required.');
    }
  };
  return (
    <div>
      <h2 className="title">{event ? 'Update' : 'Create'} Event</h2>
      <Form className="login-form" onSubmit={handleFormSubmit}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            value={state.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="event_date">
          <Form.Label>Select Event Date: </Form.Label>{' '}
          <DateTimePicker
            name="event_date"
            placeholder="Enter event date"
            value={state.event_date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Enter description"
            value={state.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="file"
            placeholder="Select Image"
            onChange={handleChange}
            accept="image/png,image/jpg,image/jpeg"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="number_of_people">
          <Form.Label>Event Capacity</Form.Label>
          <Form.Control
            type="text"
            name="number_of_people"
            placeholder="Enter event capacity"
            value={state.number_of_people}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="number_of_people">
          <Form.Check
            name="is_virtual"
            type="checkbox"
            label="Is Virtual"
            checked={state.is_virtual}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">{event ? 'Update' : 'Create'} Event</Button>
      </Form>
    </div>
  );
};

export default EventForm;
