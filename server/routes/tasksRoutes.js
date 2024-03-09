const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/taskModels');

// Fetch all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ creator: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      creator: req.user.id 
    });

    const task = await newTask.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Select a task
router.get('/:taskID', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.taskId, user: req.user.id });
    
        if (!task) {
          return res.status(404).json({ msg: 'Task not found' });
        }
    
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a task
router.put('/:taskID', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.taskId);
    
        if (!task) {
          return res.status(404).json({ msg: 'Task not found' });
        }
    
        if (task.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized to update this task' });
        }
    
        task = await Task.findByIdAndUpdate(req.params.taskId, { $set: req.body }, { new: true });
    
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/:taskID', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.taskId);
    
        if (!task) {
          return res.status(404).json({ msg: 'Task not found' });
        }
    
        if (task.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized to delete this task' });
        }
    
        await Task.findByIdAndRemove(req.params.taskId);
    
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
