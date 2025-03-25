import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import productdata from '../../data/products.json'
import ProductCards from './ProductCards'
import Shopfiltering from './Shopfiltering'
const filters={
  categories:['all','accessories','dress','jewellery','cosmetics'],
  colors:['all','red','black','blue','gold','silver','green'],
  priceRange:[
    {label:'Under $50',min:0,max:50},
    {label:'$50 - $100',min:50,max:100},
    {label:'$100 - $150',min:100,max:150},
    {label:'Above $150',min:150,max:Infinity}
  ]
}
const Shop = () => {
  const [products,setProducts]=useState(productdata);
  const [filteredState,setFilteredState]=useState({
    category:'all',
    color:'all',
    priceRange: ''
  });
  function handleFiltering (){
    let filteredProducts=productdata;
    //filer by category
    if(filteredState.category && filteredState.category!=='all'){
      filteredProducts=filteredProducts.filter(product=>product.category===filteredState.category)
    }
    if(filteredState.color && filteredState.color!=='all'){
      filteredProducts=filteredProducts.filter(product=>product.color===filteredState.color);
    }
    if(filteredState.priceRange){
      const [minPrice,maxPrice]= filteredState.priceRange.split('-').map(Number);
      filteredProducts=filteredProducts.filter(product=>product.price>=minPrice && product.price<=maxPrice);
    }
    setProducts(filteredProducts);
  }
  useEffect(()=>{
    handleFiltering();
  },[filteredState])

  function clearFilter(){
    setFilteredState({
      category:'all',
      color:'all',
      priceRange: ''
    })
  }
  


  return (
    <>
    <section className='section__container bg-primary-light '>
      <h2 className='section__header capitalize'>shop page</h2>
      <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae dicta exercitationem architecto perspiciatis rem, ducimus nostrum maxime distinctio ad adipisci sapiente? Ab quae obcaecati eveniet, reiciendis delectus atque labore quisquam.</p>     
    </section>

    <section className='section__container'>
      <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
        {/* left */}
        <div>
          <Shopfiltering 
          filters={filters} 
          filteredState={filteredState} 
          setFilteredState={setFilteredState} 
          clearFilter={clearFilter} />
        </div>
        {/* right */}
        <div>
          <h3 className='text-xl font-medium mb-4'>Avalable {products.length}</h3>
          <ProductCards products={products}/>

        </div>


      </div>
    </section>
    </>
  )
}

export default Shop
