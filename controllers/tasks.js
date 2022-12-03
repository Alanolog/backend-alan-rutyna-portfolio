const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};
const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const task = await Task.findByIdAndDelete({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).send();
};
const updateTask = async (req, res) => {
  const {
    body: { description, name },
    user: { userId },
    params: { id: taskId },
  } = req;
  if (description === "" || name === "") {
    throw new BadRequestError("description and name fields cannot be empty");
  }
  const task = await Task.findByIdAndUpdate(
    {
      _id: taskId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new NotFoundError(`There is no task with ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
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
