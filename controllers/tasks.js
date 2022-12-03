const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

const createTask = async (req, res) => {
  res.send("Task created");
};
const deleteTask = async (req, res) => {
  res.send("Task deleted");
};
const updateTask = async (req, res) => {
  res.send("Task updated");
};
const getSingleTask = async (req, res) => {
  res.send("Single task provided");
};
const getAllTasks = async (req, res) => {
  console.log(req.user);
  const tasks = Task.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ tasks });
};
module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getSingleTask,
  getAllTasks,
};
