const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../../../controllers/task");
const { validationCreateTask, validationUpdateTask } = require("./validation");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});
router.get("/", guard, getAll).post("/", guard, validationCreateTask, create);
router
  .get("/:id", guard, getById)
  .delete("/:id", guard, remove)
  .put("/:id", guard, validationUpdateTask, update);

module.exports = router;
