const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'], default: 'TODO'},
  dueDate: Date,
  creator: { type:Schema.Types.ObjectId, ref: 'User', required: true},
  collaboratores: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
