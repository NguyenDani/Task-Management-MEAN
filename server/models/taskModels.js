const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String, // Make description into String Array w/ status box per element
  status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'], default: 'TODO'},
  // Implement creation date
  dueDate: Date, // Default to Undetermined
  creator: { type:Schema.Types.ObjectId, ref: 'User', required: true},
  collaboratores: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
