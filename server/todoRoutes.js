import express from 'express';
import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo
} from './todoControllers.jsx';

const todoRoutes = express.router();

todoRoutes.get('/', getTodos);

todoRoutes.post('/', addTodo);

todoRoutes.patch('/:id', editTodo);

todoRoutes.delete('/:id', deleteTodo);

