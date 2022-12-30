const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      maxlength: [20, "name can not be more than 20 characters"],
    },
    description: {
      type: String,
      default: "placeholder description",
      required: [true, "Please provide task description"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
