require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => console.log('Errro connecting to database'));
