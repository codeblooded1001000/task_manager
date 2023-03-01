const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expireOn:{
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {versionKey: false})

const taskmanagerModel = mongoose.model('tasks', taskSchema);

module.exports = taskmanagerModel