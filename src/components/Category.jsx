import { useState } from 'react';
import axios from 'axios';
import ToDo from './ToDo.jsx';

const Category = ({ category, fetchCategories }) => {
  const [name, setName] = useState(category.name);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const { _id } = category;

  const handleEdit = () => {
    axios.patch(`http://localhost:3000/todo/category/${_id}`, {
      name: name
    })
      .then((response) => {
        console.log(response.data);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/todo/category/${_id}`)
      .then(() => {
        fetchCategories();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='w-96 flex flex-col gap-y-8'>
      <div
        className='flex justify-between'
        onMouseEnter={() => { setShowEdit(true); setShowDelete(true); }}
        onMouseLeave={() => { setShowEdit(false); setShowDelete(false); }}>
        {
          editing
           ? <input
              className='w-full bg-slate-800 rounded-r uppercase text-4xl'
              type='text'
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEdit();
                }
              }}
          />
          : <span className='uppercase tracking-widest text-4xl font-bold'>{name}</span>
        }
        <div className='flex items-center gap-x-1'>
          {
            showEdit &&
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
            onClick={() => { setShowEdit(false); setEditing(true) }}>
            <path fillRule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clipRule="evenodd" />
            </svg>
          }
          {
            showDelete &&
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
            onClick={handleDelete}>
            <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
            </svg>
          }

        </div>
      </div>
      <ToDo categoryId={_id}/>
    </div>
  )
}

export default Category