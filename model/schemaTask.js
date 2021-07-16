const { Schema, model } = require("mongoose");
const { statusTask } = require("../helpers/task");
// const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: true,
    },
    date_target: {
      type: String,
      default: new Date(),
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    priority: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [...Object.values(statusTask)],
      default: statusTask.TODO,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);
// taskSchema.plugin(mongoosePaginate);

const Task = model("task", taskSchema);

module.exports = Task;
