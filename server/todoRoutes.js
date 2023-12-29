import express from 'express';
import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  getTodos,
  addTodo,
  editTodo,
  deleteTodo
} from './todoControllers.js';

const todoRoutes = express.Router();

todoRoutes.get('/category', getCategories);

todoRoutes.post('/category', addCategory);

todoRoutes.patch('/category/:id', editCategory);

todoRoutes.delete('/category/:id', deleteCategory);

todoRoutes.get('/', getTodos);

todoRoutes.post('/', addTodo);

todoRoutes.patch('/:id', editTodo);

todoRoutes.delete('/:id', deleteTodo);

export default todoRoutes;
