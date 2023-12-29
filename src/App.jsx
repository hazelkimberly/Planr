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
    <div className='main-container'>
      <CategoryList categoryList={categoryList} fetchCategories={fetchCategories}/>
      <div className='add-category'>
        <input
          type='text'
          placeholder='Create New List'
          value={category}
          onChange={(e) => {setCategory(e.target.value)}}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCategorySubmit();
            }
          }}/>
      </div>
    </div>
  )
}

export default App
