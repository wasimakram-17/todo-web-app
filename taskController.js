const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({ userId: req.user.id, title, description });
    await newTask.save();
    res.json(newTask);
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true });
    res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json('Task deleted');
};
