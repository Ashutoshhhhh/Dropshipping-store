import React, { useEffect, useState } from 'react'
import products from '../../data/products.json'
import ProductCards from '../Shop/ProductCards';
const Search = () => {
    const [searchQuery,setSearchQuery]=useState('');
    const [filteredProducts,setFilteredProducts]=useState([]);

    function handleSearch(){
        console.log(searchQuery)
        const query=searchQuery.toLowerCase();
        if(query.length>0){
            const filtered=products.filter(product=>product.name.toLowerCase().includes(query)
            || product.description.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
            setFilteredProducts(filtered);
        }
        
    }
  
return (
    <>
    <section className='section__container bg-primary-light '>
      <h2 className='section__header capitalize'>Search Products </h2>
      <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae dicta exercitationem architecto perspiciatis rem, ducimus nostrum maxime distinctio ad adipisci sapiente? Ab quae obcaecati eveniet, reiciendis delectus atque labore quisquam.</p>    
    </section>

    <section className='section__container'>
        <div className='w-full flex gap-4 mb-12 flex-col md:flex-row items-center justify-center '>
            <input
            type='text'
            placeholder='Search For Products'
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            className='search-bar w-full max-w-4xl p-2 border rounded '/>
            <button 
            onClick={handleSearch}
            className='search-button w-full md:w-auto py-2 px-8 bg-primary hover:bg-primary-dark text-white
            rounded'>Search</button>
        </div>
        <ProductCards products={filteredProducts}/>

    </section>
    </>
  )
}

export default Search
