const {
  listTask,
  createTask,
  getTaskById,
  removeTask,
  updateTask,
} = require("../repositories/task");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await listTask(userId);
    res.json({ status: "success", code: 200, data: task });
  } catch (e) {
    next(e);
  }
};

//done

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await createTask(userId, req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { task } });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await getTaskById(userId, req.params.id);
    return task
      ? res.json({ status: "success", code: 200, data: { task } })
      : res.json({ status: "error ", code: 404, message: "Not Found" });
  } catch (e) {
    next(e);
  }
};

//done

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await removeTask(userId, req.params.id);
    return task
      ? res.json({ status: "contact deleted", code: 200, data: { task } })
      : res.json({ status: "error ", code: 404, message: "Not Found" });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const userId = req.user.id;
      const task = await updateTask(userId, req.params.id, req.body);
      return task
        ? res.json({ status: "success", code: 200, data: { task } })
        : res.json({ status: "error", code: 404, message: "Not Found" });
    }
    return res.json({
      status: "Bad Request",
      code: 400,
      message: "missing fields",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
