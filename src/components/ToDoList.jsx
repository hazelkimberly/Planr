import { useState } from 'react';
import axios from 'axios';
import ToDoEntry from './ToDoEntry.jsx';

const ToDoList = ({ todoList, fetchTodos }) => {
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleClear = () => {
    todoList.filter((todo) => todo.completed).forEach((todo) => {
      axios.delete(`http://localhost:3000/todo/${todo._id}`)
        .then(() => {
          fetchTodos();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  return (
    <div>
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
      <div className='todo-footer'>
        <div className='list-options'>
          <button className='list-option' onClick={() => { setAll(true); setActive(false); setCompleted(false); } }>All</button>
          <button className='list-option' onClick={() => { setActive(true); setAll(false); setCompleted(false); }}>Active</button>
          <button className='list-option' onClick={() => { setCompleted(true); setAll(false); setActive(false); }}>Completed</button>
        </div>
        <button className='clear-completed' onClick={handleClear} >Clear Completed</button>
      </div>
    </div>
  )
}

export default ToDoList