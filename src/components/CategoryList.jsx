import Category from './Category.jsx';

const CategoryList = ({ categoryList, fetchCategories }) => {
  return (
    <div>
      {
        categoryList.map((category) => <Category key={category._id} category={category} fetchCategories={fetchCategories}/>)
      }
    </div>
  )
}

export default CategoryList