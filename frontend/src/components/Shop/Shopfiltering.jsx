import React from 'react'

const Shopfiltering = ({filters ,filteredState,setFilteredState, clearFilter,setCurrentPage}) => {
    
    return (
    <div className='space-y-5 flex-shrink-0 w-[200px]'>
        <h3>Filters</h3>

        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg '>Categories</h4>
            <hr/>
            {
                
                filters.categories.map((category,index)=>{
                    
                    return <label key={index} className='capitalize cursor-pointer '>
                        <input type='radio'
                        name='category'
                        id='category'
                        value={category}
                        checked={filteredState.category===category}
                        onChange={(e)=>{
                            setCurrentPage(1);
                            setFilteredState({...filteredState, category: e.target.value})}}/>
                        <span className='ml-1'>{category}</span>

                    </label>
                })
            }
            
        </div>
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg '>Colors</h4>
            <hr/>
            {
                
                filters.colors.map((color,index)=>{
                    
                    return <label key={index} className='capitalize cursor-pointer '>
                        <input type='radio'
                        name='color'
                        id='color'
                        value={color}
                        checked={filteredState.color===color}
                        onChange={(e)=>setFilteredState({...filteredState, color: e.target.value})}/>
                        <span className='ml-1 capitalize'>{color}</span>

                    </label>
                })
            }
            
        </div>
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg '>Price Range</h4>
            <hr/>
            {
                
                filters.priceRange.map((priceRange,index)=>{
                    
                    return <label key={index} className='capitalize cursor-pointer '>
                        <input type='radio'
                        name='priceRange'
                        id='priceRange'
                        value={`${priceRange.min} - ${priceRange.max}`}
                        checked={filteredState.priceRange===`${priceRange.min} - ${priceRange.max}`}
                        onChange={(e)=>setFilteredState({...filteredState,priceRange:e.target.value})}
                         />
                        <span className='ml-1'>{priceRange.label}</span>

                    </label>
                })
            }
            
        </div>

        <button onClick={clearFilter} className='bg-primary py-1 px-4 text-white rounded hover:bg-primary-dark'>Clear Filters</button>
      
    </div>
  )
}

export default Shopfiltering
