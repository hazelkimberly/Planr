import Category from './Category.jsx';

const CategoryList = ({ categoryList, fetchCategories }) => {
  return (
    <div className='flex space-x-32'>
      {
        categoryList.map((category) => <Category key={category._id} category={category} fetchCategories={fetchCategories}/>)
      }
    </div>
  )
}

export default CategoryList