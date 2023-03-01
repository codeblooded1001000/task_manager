const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  createdAt:{
    type: Date
  }
}, {versionKey: false})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel