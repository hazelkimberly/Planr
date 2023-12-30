import { useState, useEffect } from 'react'
import axios from 'axios';
import CategoryList from './components/CategoryList.jsx';
import './App.css'

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('');

  const fetchCategories = () => {
    axios.get('http://localhost:3000/todo/category')
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCategorySubmit = () => {
    axios.post('http://localhost:3000/todo/category', {
      name: category
    })
      .then((response) => {
        console.log(response);
        setCategory('');
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        fetchCategories();
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='relative'>
      <img src='/bg-desktop-dark.jpg' alt='Background Image' className='w-full h-80 object-cover'/>
      <div className='absolute top-32 left-0 flex justify-start space-x-32 overflow-x-auto max-w-full'>
        <CategoryList categoryList={categoryList} fetchCategories={fetchCategories}/>
        <div className='flex flex-col gap-y-8 flex-shrink-0'>
          <span className='uppercase tracking-widest text-4xl font-bold'>Add New List</span>
          <input
            className='bg-slate-800 rounded h-14 px-3 josefin pt-1'
            type='text'
            placeholder='Name of new list...'
            value={category}
            onChange={(e) => {setCategory(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCategorySubmit();
              }
            }}/>
        </div>
      </div>
    </div>
  )
}

export default App
