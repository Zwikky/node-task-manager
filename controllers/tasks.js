const getAllTasks = (req, res) => {
  res.send("All Items");
};

const createTask = (req, res) => {
  const { task } = req.body;
  res.status(200).json({ task });
};

const getTask = (req, res) => {
  res.json({ action: "Get Single Task", data: req.params });
};

const editTask = (req, res) => {
  res.send("Edit One task");
};

const deleteTask = (req, res) => {
  res.send("Delete one task");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  editTask,
  deleteTask,
};
