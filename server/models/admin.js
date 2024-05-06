const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
    {
        username: {
          type: String,
          requird: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          default: 'admin',
          required: false,
        },
      },
      {
        timestamps: true,
      }
);

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;