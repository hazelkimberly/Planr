import { useState, useEffect } from 'react';
import axios from 'axios';
import ToDoList from './ToDoList.jsx';

const ToDo = ({ categoryId }) => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');

  const fetchTodos = () => {
    axios.get(`http://localhost:3000/todo/?category=${categoryId}`)
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTodoSubmit = () => {
    axios.post('http://localhost:3000/todo', {
      description: todo,
      category: categoryId
    })
      .then((response) => {
        console.log(response);
        setTodo('');
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        fetchTodos();
      });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className='flex flex-col gap-y-5 josefin'>
      <div className='flex border-slate-800 rounded gap-x-3 h-14 px-3 bg-slate-800'>
        <input type='checkbox' disabled/>
        <input
          className='w-full bg-slate-800 rounded-r pt-1'
          type='text'
          placeholder='Create a new todo...'
          value={todo}
          onChange={(e) => { setTodo(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTodoSubmit();
            }
          }}
        />
      </div>
      <ToDoList todoList={todoList} fetchTodos={fetchTodos}/>
    </section>
  )
}

export default ToDo;