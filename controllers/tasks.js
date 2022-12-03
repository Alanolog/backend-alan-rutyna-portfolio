const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/index");

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};
const deleteTask = async (req, res) => {
  res.send("Task deleted");
};
const updateTask = async (req, res) => {
  res.send("Task updated");
};
const getSingleTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const task = await Task.findById({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`there is no task with id: ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};
const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ tasks, nbOfTasks: tasks.length });
};
module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getSingleTask,
  getAllTasks,
};
