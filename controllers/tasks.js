const Task = require("./../models/Task");
const asyncWrapper = require("./../middleware/async");
const {
  createCustomError,
  CustomAPIError,
} = require("./../errors/custom-error");

const getAllTasks = asyncWrapper(
  asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  })
);

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (task) {
    return res.status(200).json({ success: true, task });
  }

  return next(
    createCustomError(`No matching task found for ID: ${taskID}`, 404)
  );
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (task) {
    return res.status(201).json({ success: true, msg: "Deleted Succesfully" });
  }
  return next(
    createCustomError(`No matching task found for ID: ${taskID}`, 404)
  );
});

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomError(`No matching task found for ID: ${taskID}`, 404)
    );
  }
  res.status(200).json({ id: taskID, data: req.body });
});
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  editTask,
  deleteTask,
};
