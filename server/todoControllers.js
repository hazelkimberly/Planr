import { Todo } from '../database/todoModel.js';
import { Category } from '../database/todoModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch(err) {
    res.status(500).send('Internal Server Error');
  }
};

export const addCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const editCategory = async (req, res) => {
  try {
    const update = { name: req.body.name };
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(201).json(updatedCategory);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    await Todo.deleteMany({ category: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ category: req.query.category }).sort({ completed: 1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      description: req.body.description,
      category: req.body.category
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const editTodo = async (req, res) => {
  try {
    const update = {
      description: req.body.description,
      completed: req.body.completed,
      category: req.body.category
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(201).json(updatedTodo);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};
