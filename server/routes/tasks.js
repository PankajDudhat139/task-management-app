const router = require('express').Router();
const Task = require('../models/Task');
const { auth, isAdmin } = require('../middleware/auth');

// Get All (Paginated)
router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  try {
    const tasks = await Task.find().limit(limit).skip((page - 1) * limit).sort({createdAt: -1});
    const total = await Task.countDocuments();
    res.json({ tasks, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete (Admin Only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;