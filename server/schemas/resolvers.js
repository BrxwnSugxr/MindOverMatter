require('dotenv').config();
const User = require('../models/user');
const Event = require('../models/events');
const bcrypt = require('bcryptjs');
const {Query} = require('mongoose');
const jwt = require('jsonwebtoken')
const UserEvents = require('../models/userEvents');



const resolvers = {
    Query: {
        getUser: async(parent, {eventId}, context) => {
            try{
            if(context.user) {
                console.log('context', context.user);
            };
            } catch (error) {
                console.log(error);
                throw new Error('Fail to fetch event');
            }
        },
        getEvent: async (parent, {eventId}, context) => {
            try{
                const event = await Event.findById(eventId);
                return event;
            } catch(error) {
                throw new Error('Fail to fetch event');
            }
        }, 
        getEvents: async (parent, args, context) => {
            try{
                const event =  await Event.find({});
                return event;
            } catch(error) {
                throw new Error('Fail to fetch all event');
            }
        }, 
        getPublicEvents: async (parent, args, context) => {
            try{
                const events = await Event.find();
                console.log('events', events);
                return events;
            } catch (error) {
                throw new Error('Failed to fetch all events')
            }
        }, 
        userRegisteredEvents: async (parent, {userId}, context) => {
            try{
                const events = await UserEvents.find({
                    user: userId,
                });
                console.log('events', events);
                return events;
            } catch (error){
                throw new Error('Failed to fetch all userregistered Events')

            }
        }
    }, 

    Mutation: {
        register: async (parent, args, context) => {
            try{
                const hashedPassword = await bcrypt.hash(args.password, 8);
                const user = new User({
                    ...args,
                    password: hashedPassword,
                });
                await user.save();
                return user;
            } catch (error) {
                throw new Error('Fail to register user');
            }
        },
        
        login: async (parent, args, context) => {
            try{
                const user = await User.findOne({
                    email: args.email,
                });
                if(!user) {
                    throw new Error('User with provided email not found in system')
                }
                const isMatchingPassword = await bcrypt.compare(
                    args.password, 
                    user.password
                );
                if(!isMatchingPassword) {
                    throw new Error ('Invalid credentials')
                };
                const token  = await jwt.sign(
                    {_id: user._id },
                    process.env.JWT_SECRET_KEY, 
                    {
                        expiresIn: '2h',
                    }
                );
                user.token = token;
                await user.save();
                return {
                    user,
                    token,
                };
            } catch (error) {
                console.log(error);
                throw new Error('Fail to login user')
            }
        }, 
        createEvent: async (parent, { eventInput}, context ) => {
            if(context.user) {
                try{
                    const userId = context.user._id;

                const event = new Event({ ... eventInput, user: userId});

                await event.save();
                return event;
                }catch (error) {
                    console.log(error);
                    throw new Error('Fail to create event');
                }
            } else {
                throw new Error('Please Login to create event')
            }
        },
        updateEvent: async (parent, {eventId, input}, context) => {
            try{
                const event = await Event.findByIdAndDelete(eventId);
                return event;
            } catch (error) {
                console.log(error);
                throw new Error('Fail to delete event')
            }
        }
    }

};

module.exports = resolvers;