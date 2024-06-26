require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Event = require('../models/event');
const bcrypt = require('bcryptjs');
const { Query } = require('mongoose');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const UserEvents = require('../models/UserEvents');
const cloudinary = require('../config');
const User = require('../models/user');
const { Resend } = require('resend');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

const resolvers = {
  Query: {
    getEvent: async (parent, { eventId }, context) => {
      try {
        const event = await Event.findById(eventId);
        return event;
      } catch (error) {
        throw new Error('Fail to fetch event');
      }
    },
    getEvents: async (parent, args, context) => {
      try {
        const events = await Event.find().sort({
          updatedAt: -1,
        });
        return events;
      } catch (error) {
        throw new Error('Failed to fetch all events');
      }
    },
    getPublicEvents: async (parent, args, context) => {
      try {
        const events = await Event.find();
        return events;
      } catch (error) {
        throw new Error('Failed to fetch all events');
      }
    },
    userRegisteredEvents: async (parent, { userId }, context) => {
      try {
        const events = await UserEvents.find({
          user: userId,
        }).populate('event');
        return events;
      } catch (error) {
        throw new Error('Failed to fetch all events');
      }
    },
  },
  Mutation: {
    donateAmount: async (parent, { amount }, context) => {
      try {
        const lineItems = [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'Donation Amount',
              },
              unit_amount: Math.ceil(amount * 100),
            },
            quantity: 1,
          },
        ];
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${context.headers.origin}/success`,
          cancel_url: `${context.headers.origin}/`,
        });
        return {
          id: session.id,
        };
      } catch (error) {
        console.log(error);
        throw new Error('Error during donating amount');
      }
    },
    sendEmail: async (parent, { username, email, message }, context) => {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // email
          to: 'jsdev.mas@gmail.com',
          subject: 'Contact Us: Enquiry',
          html: `
            <p>
              <p>
                Hi,
                I'm ${username},
              </p>
              <p>
              ${message}
              </p>
            </p>
          `,
        });

        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch all events');
      }
    },
    singleUpload: async (parent, { file, eventId }, context) => {
      if (context.user) {
        try {
          const { createReadStream, mimetype, filename, encoding } =
            await file.file;
          const stream = createReadStream();
          const imagePath = path.join(__dirname, '..', 'images', filename);
          const out = await fs.createWriteStream(imagePath);
          await stream.pipe(out);
          await sleep();
          const response = await cloudinary.uploader.upload(imagePath, {
            folder: 'images/profiles',
            resource_type: 'image',
          });

          const event = await Event.findById(eventId);
          if (event) {
            event.image = response.secure_url;
            await event.save();
          }
          return {
            filename,
            mimetype,
            encoding,
            url: response.secure_url,
          };
        } catch (error) {
          console.log(error);
          throw new Error('Failed to upload file');
        }
      } else {
        console.log(error);
        throw new Error('Authorization failed.');
      }
    },
    register: async (parent, args, context) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 8);
        const user = new User({
          ...args,
          password: hashedPassword,
        });

        await user.save();

        return user;
      } catch (error) {
        console.log(error);
        throw new Error('Fail to register user');
      }
    },
    registerAdmin: async (parent, args, context) => {
      try {
        const hashedPassword = await bcrypt.hash(args.password, 8);
        const admin = new Admin({
          ...args,
          password: hashedPassword,
        });

        await admin.save();

        return admin;
      } catch (error) {
        console.log(error);
        throw new Error('Fail to register admin');
      }
    },
    registerUserForEvent: async (parent, { userId, eventId }, context) => {
      try {
        const eventInfo = await Event.findById(eventId);
        const capacity = parseInt(eventInfo.number_of_people);
        const alreadyRegisteredUSers = await UserEvents.find({
          event: eventId,
        });
        if (
          alreadyRegisteredUSers &&
          alreadyRegisteredUSers.length < capacity
        ) {
          const userEvents = new UserEvents({
            user: userId,
            event: eventId,
          });
          await userEvents.save();

          const matchingEvent = await Event.findOne({
            _id: eventId,
          });
          if (matchingEvent) {
            matchingEvent.number_of_people =
              parseInt(matchingEvent.number_of_people, 10) - 1;
            await matchingEvent.save();
          }
          return {
            success: true,
          };
        } else {
          throw new Error('Event maximum capacity reached.');
        }
      } catch (error) {
        console.log(error);
        throw new Error(error.message || 'Fail to register user for the event');
      }
    },
    unRegisterFromEvent: async (parent, { userId, eventId }, context) => {
      try {
        const event = await UserEvents.findOne({
          user: userId,
          event: eventId,
        });
        if (!event) {
          throw new Error('No matching event found.');
        }
        await event.deleteOne();
        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error.message || 'Fail to register user for the event');
      }
    },
    login: async (parent, args, context) => {
      try {
        const user = await User.findOne({
          email: args.email,
        });
        if (!user) {
          throw new Error('User with provided mail address does not exist');
        }
        const isMatchingPassword = await bcrypt.compare(
          args.password,
          user.password
        );
        if (!isMatchingPassword) {
          throw new Error('Invalid credentials');
        }
        const token = await jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '2d',
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
        throw new Error(error.message || 'Fail to login user');
      }
    },
    loginAdmin: async (parent, args, context) => {
      try {
        const admin = await Admin.findOne({
          email: args.email,
        });
        if (!admin) {
          throw new Error('Admin with provided mail address does not exist');
        }
        const isMatchingPassword = await bcrypt.compare(
          args.password,
          admin.password
        );
        if (!isMatchingPassword) {
          throw new Error('Invalid credentials');
        }
        const token = await jwt.sign(
          { _id: admin._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        );
        admin.token = token;
        await admin.save();
        return {
          admin,
          token,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error.message || 'Fail to login admin');
      }
    },
    createEvent: async (parent, { eventInput }, context) => {
      if (context.user) {
        try {
          const userId = context.user._id;

          const event = new Event({ ...eventInput, user: userId });

          await event.save();

          return event;
        } catch (error) {
          console.log(error);
          throw new Error('Fail to create event');
        }
      } else {
        throw new Error('Please login to create event');
      }
    },
    updateEvent: async (parent, { eventId, input }, context) => {
      try {
        const event = await Event.findByIdAndUpdate(eventId, input, {
          new: true,
        });

        return event;
      } catch (error) {
        console.log(error);
        throw new Error('Fail to update event');
      }
    },
    deleteEvent: async (parent, { eventId }, context) => {
      try {
        const event = await Event.findByIdAndDelete(eventId);
        return event;
      } catch (error) {
        console.log(error);
        throw new Error('Fail to delete event');
      }
    },
  },
};

module.exports = resolvers;
