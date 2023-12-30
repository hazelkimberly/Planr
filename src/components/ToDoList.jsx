import { useState } from 'react';
import axios from 'axios';
import ToDoEntry from './ToDoEntry.jsx';

const ToDoList = ({ todoList, fetchTodos }) => {
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleClear = () => {
    const deletePromises = todoList.filter((todo) => todo.completed).map((todo) => {
      return axios.delete(`http://localhost:3000/todo/${todo._id}`)
    });

    Promise.all(deletePromises)
      .then(() => {
        fetchTodos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='border-slate-800 rounded bg-slate-800'>
      <div className='displayed-list'>
        {
          all &&
          todoList.map((todo) => <ToDoEntry key={todo._id} todo={todo} fetchTodos={fetchTodos}/>)
        }
        {
          active &&
          todoList.filter((todo) => !todo.completed).map((todo) => <ToDoEntry key={todo._id} todo={todo} fetchTodos={fetchTodos}/>)
        }
        {
          completed &&
          todoList.filter((todo) => todo.completed).map((todo) => <ToDoEntry key={todo._id} todo={todo} fetchTodos={fetchTodos}/>)
        }
      </div>
      <div className='flex justify-between text-sm font-bold h-12 items-center px-3 pt-1' style={{ color: 'hsl(234, 11%, 52%)' }}>
        <div className='flex gap-x-3'>
          <button style={{ color: all && 'hsl(220, 98%, 61%)' }} onClick={() => { setAll(true); setActive(false); setCompleted(false); } }>All</button>
          <button style={{ color: active && 'hsl(220, 98%, 61%)' }} onClick={() => { setActive(true); setAll(false); setCompleted(false); }}>Active</button>
          <button style={{ color: completed && 'hsl(220, 98%, 61%)' }} onClick={() => { setCompleted(true); setAll(false); setActive(false); }}>Completed</button>
        </div>
        <button className='clear-completed' onClick={handleClear}>Clear Completed</button>
      </div>
    </div>
  )
}

export default ToDoList