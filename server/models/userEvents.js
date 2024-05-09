const mongoose = require('mongoose');

const UserEventsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
  },
  {
    timestamps: true,
  }
);

const UserEvents = mongoose.model('UserEvents', UserEventsSchema);

module.exports = UserEvents;
