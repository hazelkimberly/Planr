import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Todo = mongoose.model('Todo', todoSchema);
export const Category = mongoose.model('Category', categorySchema);