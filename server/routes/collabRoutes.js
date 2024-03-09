const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/taskModels');
const User = require('../models/userModels');

// Invite another user to collaborate on a task
router.post('/:taskId/invite/:userId', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.collaborators.includes(req.params.userId)) {
      return res.status(400).json({ msg: 'User is already a collaborator on this task' });
    }

    task.collaborators.push(req.params.userId);
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a user from collaboration on a task
router.delete('/:taskId/invite/:userId', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (!task.collaborators.includes(req.params.userId)) {
      return res.status(400).json({ msg: 'User is not a collaborator on this task' });
    }

    task.collaborators = task.collaborators.filter(collaborator => collaborator !== req.params.userId);
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
