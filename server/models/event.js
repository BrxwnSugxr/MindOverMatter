const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requird: true,
    },
    description: {
      type: String,
    },
    number_of_people: {
      type: String,
      required: true,
    },
    event_date: {
      type: String,
      required: true,
    },
    is_virtual: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
