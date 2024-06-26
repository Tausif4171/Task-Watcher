import mongoose, { Schema } from "mongoose";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    status: String,
    progress: Number,
    priority: Number,
    category: String,
    // active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
