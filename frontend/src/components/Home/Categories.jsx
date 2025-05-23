import React from 'react'
import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import { Link } from 'react-router-dom'
import category4 from '../../assets/category-4.jpg'
const Categories = () => {
    const categories=[
        {name:'Accessories', path:'accessories', image:category1 },
        {name:'Dress Collection', path:'dress', image:category2 },
        {name:'Jewellery', path:'jewellery', image:category3 },
        {name:'Cosmetics', path:'cosmetics', image:category4 }
    ]
  return (
    <div className='product__grid overflow-x-hidden'>
      {
        categories.map((category,index)=>{
            return <Link key={index} className='categories__card  hover:scale-110 transition-all duration-200'
             to={`/categories/${category.path}`} >
                <img src={category.image} alt={category.name}/>
                <h4>{category.name}</h4>
            </Link>
        })
      }
    </div>
  )
}

export default Categories
