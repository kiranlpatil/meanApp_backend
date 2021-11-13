const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required to proceed'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required to proceed'],
  },
  email: {
    type: String,
    required: [true, 'Email is required to proceed'],
    unique: true,
    trim: true
  },
  mobileNumber: {
    type: Number,
    required: [true, 'Mobile Number is required to proceed'],
  },
  city: {
    type: String,
    required: [true, 'City is required to proceed'],
  },
  password: {
    type: String,
    required: [true, 'Password is required to proceed'],
  }
},  { timestamps: true, versionKey: false })

module.exports = mongoose.model('User', userSchema);
