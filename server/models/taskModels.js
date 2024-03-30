const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false }
})

const taskSchema = new Schema({
  title: { type: String, required: true },
  creator: { type:Schema.Types.ObjectId, ref: 'User', required: true},
  // Implement creation date
  dueDate: Date,
  status: { type: String, enum: ['TO_DO', 'IN_PROGRESS', 'COMPLETED'], default: 'TO_DO'},
  collaboratores: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  todo: [todoSchema]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
