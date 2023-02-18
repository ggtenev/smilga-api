const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you i need this'],
    trim: true,
    maxlength:[20,'too long']
  },
  completed: {
    type: Boolean,
    default:false
  }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task