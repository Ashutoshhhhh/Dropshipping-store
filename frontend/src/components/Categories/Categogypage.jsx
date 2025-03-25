import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import ProductCards from '../Shop/ProductCards';
const Categogypage = () => {
    const {categoryName}=useParams();
    const [filterProducts,setFilteredProducts]=useState([]);
    useEffect(()=>{
        const filtered=products.filter((product,index)=>product.category===categoryName.toLowerCase());
        setFilteredProducts(filtered);
      },[categoryName])
    
    useEffect(()=>{
      window.scrollTo(0,0);
    },[])
    
  return (
    <section className='section__container bg-primary-light '>
      <h2 className='section__header capitalize'>{categoryName}</h2>
      <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae dicta exercitationem architecto perspiciatis rem, ducimus nostrum maxime distinctio ad adipisci sapiente? Ab quae obcaecati eveniet, reiciendis delectus atque labore quisquam.</p>
      <div className='section__container container'>
        <ProductCards products={filterProducts}/> 
      </div>    
    </section>
  )
}

export default Categogypage
