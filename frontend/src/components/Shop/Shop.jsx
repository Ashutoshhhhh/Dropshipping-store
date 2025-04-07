import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import productdata from '../../data/products.json'
import ProductCards from './ProductCards'
import Shopfiltering from './Shopfiltering'
import { useFetchAllProductsQuery } from '../../redux/features/products/productAPI'
const filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'red', 'black', 'blue', 'gold', 'silver', 'green'],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: 'Above $150', min: 150, max: Infinity }
  ]
}
const Shop = () => {

  const [filteredState, setFilteredState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productperpage, setProductPerPage] = useState(8);
  const { category, color, priceRange } = filteredState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);
  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productperpage
  })

  if (isLoading) {
    return <div>Loading ....</div>
  }
  if (error) {
    return <div>Error: {error?.data?.message || error?.error || 'Something went wrong'}</div>;
  }

  function clearFilter() {
    setFilteredState({
      category: 'all',
      color: 'all',
      priceRange: ''
    })
  }
  const startProduct = (currentPage - 1) * productperpage + 1;
  const endProduct = startProduct + products.length - 1;

  function handlePagination(page) {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)

    }
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
              setCurrentPage={setCurrentPage}
              filters={filters}
              filteredState={filteredState}
              setFilteredState={setFilteredState}
              clearFilter={clearFilter} />
          </div>
          {/* right */}
          <div>
            <h3 className='text-xl font-medium mb-4'>Showing {startProduct} to {endProduct} of {totalProducts}</h3>
            <ProductCards products={products} />
            {/* pagination control */}

            <div className='mt-6 flex justify-center'>
              <button
                onClick={() => handlePagination(currentPage - 1)}
                className={`px-4 py-2 ${currentPage === 1 ? 'hidden' : 'flex'} bg-gray-300 text-gray-700 rounded-md mr-2`}>Prev</button>
              {
                [...Array(totalPages)].map((_, index) => {
                  return <button key={index}
                    onClick={() => handlePagination(index + 1)}
                    className={`px-4 py-2 rounded-md mx-1 ${index + 1 > currentPage + 2 ? 'hidden' : 'flex'} ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}> {index + 1}</button>
                })
              }
              <button
                onClick={() => handlePagination(currentPage + 1)}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 ${currentPage === totalPages ? 'hidden' : 'flex'} `}>Next</button>

            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default Shop
