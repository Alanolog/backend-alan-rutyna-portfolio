const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  updateTask,
  getSingleTask,
  getAllTasks,
} = require("../controllers/tasks");
router.route("/").get(getAllTasks);
router
  .route("/:id")
  .get(getSingleTask)
  .post(createTask)
  .delete(deleteTask)
  .patch(updateTask);

module.exports = router;
