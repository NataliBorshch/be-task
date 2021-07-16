const Task = require("../model/schemaTask");

const listTask = async () => {
  const result = await Task.find();
  return result;
};

const getTaskById = async (id) => {
  const result = await Task.findById(id);
  return result;
};

const removeTask = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};

const createTask = async (body) => {
  const result = await Task.create({ ...body });
  return result;
};

const updateTask = async (id, body) => {
  const result = await Task.findByIdAndUpdate(id, { ...body }, { new: true });
  return result;
};

module.exports = {
  listTask,
  getTaskById,
  removeTask,
  createTask,
  updateTask,
};
