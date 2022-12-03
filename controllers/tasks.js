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
  res.send("Tasks");
};
module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getSingleTask,
  getAllTasks,
};
