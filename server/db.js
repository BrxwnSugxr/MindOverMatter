require('dotenv').config();
const mongoose = require('mongoose');


mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
        console.log('Database connected succesfully')
    })
    .catch((error) => console.log('Error connecting to database'))