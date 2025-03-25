import React, { useState } from 'react'
import ProductCards from './ProductCards'
import products from '../../data/products.json'
const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts]=useState(8);

    function loadMoreProducts(){
        setVisibleProducts(prev=>prev+4);
    }
  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Trending Products</h2>
        <p className='section__subheader '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam itaque incidunt ipsum atque at aliquid ipsam accusantium, aut suscipit eni</p>

        <ProductCards products={products.slice(0,visibleProducts)} />
        <div className='product__btn'>
          {
            visibleProducts<products.length &&(
              <button className='btn' onClick={(loadMoreProducts)}>Load More</button>
            )
          }
          
        </div>
    
    </section>
  )
}

export default TrendingProducts
