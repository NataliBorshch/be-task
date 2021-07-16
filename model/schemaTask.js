const { Schema, model, SchemaTypes } = require("mongoose");
const { STATUSTASK } = require("../helpers/task");
// const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: [true, "Set name for contact"],
    },
    date_target: [String],
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: [...Object.values(STATUSTASK)],
      default: STATUSTASK.TODO,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
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
    toObject: {
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
