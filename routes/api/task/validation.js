const Joi = require("joi");

const schemaCreateTask = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  date_target: Joi.string(),
  description: Joi.string().required(),
  status: Joi.string(),
  reject: Joi.boolean(),
  priority: Joi.boolean(),
  owner: Joi.object(),
});

const schemaUpdateTask = Joi.object({
  name: Joi.string().alphanum().min(3).max(40).optional(),
  date_target: Joi.string(),
  description: Joi.string().required(),
  status: Joi.string(),
  priority: Joi.boolean(),
  reject: Joi.boolean(),
  owner: Joi.object(),
}).min(1);

const schemaUpdateTaskReject = Joi.object({
  reject: Joi.boolean(),
}).or("reject");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  validationCreateTask: (req, res, next) => {
    return validate(schemaCreateTask, req.body, next);
  },
  validationUpdateTask: (req, res, next) => {
    return validate(schemaUpdateTask, req.body, next);
  },
  validationUpdateReject: (req, res, next) => {
    return validate(schemaUpdateTaskReject, req.body, next);
  },
};
