const { Schema, model, default: mongoose } = require('mongoose');

const EventSchema = new Schema (
    {
        title: {
            type: String, 
            required: true, 
        },
        description: {
            type: String,
        }, 
        number_of_people: {
            type: String, 
            required: true,
        }, 
        is_virtual: {
            type:Boolean, 
            required: false, 
            default: false,
        }, 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: 'User'
        }   
    }, 
    {
        //Saves the curent time in which document is created and when it is updated.
        timestamps: true,
    }
);

const Event = model('Event', EventSchema)

module.exports = Event;

// Need to add Text of description, , Point of contact of people, number of people, price, Location, Virtual