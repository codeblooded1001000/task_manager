const taskManagerModel = require('../models/taskManagerModel');
const userModel = require('../models/userModel');
const { verifyToken } = require('../middlewares/auth');

const addNewTask = async (req, res) => {
  const decodedToken = verifyToken(req, res);
  try {
    const newTask = new taskManagerModel(req.body);
    const email = decodedToken.email;
    const user = await userModel.find({ email });
    newTask.assignee = user[0].name;
    newTask.createdAt = new Date();
    await newTask.save();
    return res.status(201).json({
      status: 201,
      message: 'New Task created',
      data: newTask,
    });
  } catch (error) {
    return res.status(500).send('Something Went wrong');
  }
};

const getAll = async (req, res) => {
  const decodedToken = verifyToken(req, res);
  try {
    const email = decodedToken.email;
    const user = await userModel.find({ email });
    const name = user[0].name;
    const tasks = await taskManagerModel.find({ assignee: name });
    return res.status(200).json({
      status: 200,
      message: 'All tasks',
      data: tasks,
    });
  } catch (error) {
    return res.status(500).send('Something Went wrong');
  }
};

const getPendingTasks = async (req, res) => {
  const decodedToken = verifyToken(req, res);
  try {
    const email = decodedToken.email;
    const user = await userModel.find({ email });
    const name = user[0].name;
    const tasks = await taskManagerModel.find({
      $and: [{ assignee: name }, { completed: false }],
    });
    return res.status(200).json({
      status: 200,
      message: 'All pending tasks',
      data: tasks,
    });
    // tasks.filter(task => task.completed == false)
  } catch (error) {
    return res.status(500).send('Something Went wrong');
  }
};

const getCompletedTasks = async (req, res) => {
  const decodedToken = verifyToken(req, res);
  try {
    const email = decodedToken.email;
    const user = await userModel.find({ email });
    const name = user[0].name;
    const tasks = await taskManagerModel.find({
      $and: [{ assignee: name }, { completed: true }],
    });
    return res.status(200).json({
      status: 200,
      message: 'All Completed tasks',
      data: tasks,
    });
    // tasks.filter(task => task.completed == false)
  } catch (error) {
    return res.status(500).send('Something Went wrong');
  }
};

const updateTask = async (req, res) => {
  const decodedToken = verifyToken(req, res);
  try {
    if (!req.query.taskId) {
      return res.status(400).json({
        status: 400,
        message: 'Please provide task ID',
      });
    }
    const email = decodedToken.email;
    const user = await userModel.find({ email });
    const name = user[0].name;
    const taskId = req.query.taskId;
    const task = await taskManagerModel.find({ _id: taskId });
    if (!task.length) {
      return res.status(404).json({
        status: 404,
        message: 'No task found with this Id',
      });
    }
    if (task[0].assignee !== name) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allowed to update this.',
      });
    }
    await task[0].updateOne(req.body);
    const data = await taskManagerModel.find({ _id: taskId });
    return res.status(200).json({
      status: 200,
      message: 'task updated',
      data,
    });
  } catch (error) {
    return res.status(500).send('Something Went wrong');
  }
};

const deleteTask = async (req, res) => {
  const decodedToken = verifyToken(req, res);
  try {
    if (!req.query.taskId) {
      return res.status(400).json({
        status: 400,
        message: 'Please provide task ID',
      });
    }
    const email = decodedToken.email;
    const user = await userModel.find({ email });
    const name = user[0].name;
    const taskId = req.query.taskId;
    const task = await taskManagerModel.find({ _id: taskId });
    if (!task.length) {
      return res.status(404).json({
        status: 404,
        message: 'No task found with this Id',
      });
    }
    if (task[0].assignee !== name) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allowed to update this.',
      });
    }
    await task[0].deleteOne();
    return res.status(200).json({
      status: 200,
      message: 'task deleted',
    });
  } catch (error) {
    return res.status(500).send('Something Went wrong');
  }
};

module.exports = {
  addNewTask,
  getAll,
  updateTask,
  getPendingTasks,
  getCompletedTasks,
  deleteTask
};
