const Task = require("../model/schemaTask");

// done

const listTask = async (userId) => {
  const result = await Task.find({ owner: userId });
  return result;
};

//done

const getTaskById = async (userId, idTask) => {
  const result = await Task.findOne({ _id: idTask, owner: userId });
  return result;
};

//done
const removeTask = async (userId, idTask) => {
  const result = await Task.findByIdAndDelete({ _id: idTask, owner: userId });
  return result;
};

//work

const createTask = async (userId, body) => {
  const result = await Task.create({ ...body, owner: userId });
  return result;
};

//done

const updateTask = async (userId, idTask, body) => {
  const result = await Task.findOneAndUpdate(
    { _id: idTask, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listTask,
  getTaskById,
  removeTask,
  createTask,
  updateTask,
};
