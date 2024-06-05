import taskModel from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req?.user;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and description",
      });
    }

    const newTask = await taskModel.create({
      title,
      description,
      createdBy: id,
      status: status || "pending",
    });
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id).select("-_id -__v");
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getTasks = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const { id } = req?.user;
    const tasks = await taskModel
      .find({ createdBy: id })
      .sort("-createdAt")
      .limit(limit)
      .skip(limit * (page - 1))
      .select("-_id -__v");
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskModel.findByIdAndUpdate(id, req.body, {
      $set: true,
    });
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const tasks = await taskModel.find({ createdBy: userId });
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskModel.find({ createdBy: userId });
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }
    const deletedTasks = await taskModel.deleteMany({ createdBy: userId });
    if (deletedTasks.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All tasks deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
