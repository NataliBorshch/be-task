const Task = require("../model/schemaTask");

const getTaskById = async (userId, idTask) => {
  const result = await Task.findOne({ id: idTask, owner: userId });
  return result;
};

const removeTask = async (userId, id) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};

//work

const createTask = async (userId, body) => {
  const result = await Task.create({ ...body, owner: userId });
  return result;
};

const updateTask = async (userId, id, body) => {
  const result = await Task.findOneAndUpdate(
    { id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  // listTask,
  getTaskById,
  removeTask,
  createTask,
  updateTask,
};
