import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStar from '../RatingStar/RatingStar';
import { useDispatch } from 'react-redux'
import { useFetchProductByIdQuery } from '../../redux/features/products/productAPI';
import { addToCart } from '../../redux/features/cart/cartSlice';
const Singleproduct = () => {
    const {id}=useParams();
    const dispatch = useDispatch();
    const {data,error,isLoading} = useFetchProductByIdQuery(id);
    console.log(data);
    const singleProduct=data?.Products || {};
    const productreview= data?.Reviews || [];
    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>{error}</div>
    }

    function handleAddToCart(product){
        dispatch(addToCart(product))
    }
  return (
    <>
    <section className='section__container bg-primary-light '>
            <h2 className='section__header capitalize'>Single Product Page</h2>
            <div className='section__subheader space-x-2'>
                <span className='hover:text-primary hover:scale-105'><Link to="/">Home</Link></span><i className="ri-arrow-right-s-line"></i>
                <span className='hover:text-primary hover:scale-105'><Link to="/shop">Shop</Link></span><i className="ri-arrow-right-s-line"></i>
                <span className='text-primary '>{singleProduct.name}</span>
            </div>
    </section>,

    <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
        
            <div className='md:w-1/2 w-full'>
                <img src={singleProduct.image}
                 alt='product-image' 
                 className='rounded-md w-full h-auto '
                 /> 
            </div>

            <div className='md:w-1/2 w-full'>
                <h3 className='text-2xl font-semibold mb-4'>{singleProduct.name}</h3>
                <p className='text-xl text-primary mb-4'>${singleProduct.price} <s className='text-sm text-gray-600' >{singleProduct.oldPrice?`$ ${singleProduct.oldPrice}`:""}</s></p>
                <p className='text-gray-700 mb-4'>{singleProduct.description}</p>
                
                <div className='space-y-1'>
                    <p className='capitalize '><strong>Category:</strong> {singleProduct.category}</p>
                    <p className='capitalize '><strong>Color:</strong> {singleProduct.color}</p>
                    <div className='flex gap-2 items-center '>
                        <strong>Rating: </strong>
                        <strong ><RatingStar rating={singleProduct.rating}/></strong>
                    </div>
                    
                    
                </div>
                <button 
                onClick={(e)=>{e.stopPropagation();handleAddToCart(singleProduct)}}
                className=' mt-10 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark'>Add To Cart</button>
            </div>
             
        </div>


    </section>

    <section className='section__container mt-8'>
        {/* refviews later */}
    </section>
    </>
  )
}

export default Singleproduct
