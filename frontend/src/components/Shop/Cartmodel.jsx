import React from 'react'
import OrderSummary from './OrderSummary'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';

const Cartmodel = ({ products, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const handleQuantity = (type, id) => {
        const payload = { type, id };
        dispatch(updateQuantity(payload));

    }

    const removeFunction =(id)=>{
        console.log(id);
        const payload={id};
        dispatch(removeFromCart(payload));

    }
    return (
        <div className={`fixed z-[1000] inset-0 bg-black bg-opacity-80  transition-opacity
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}

            onClick={onClose}
            style={{ transition: 'opacity 300ms' }}
        >
            <div className={`fixed w-full right-0 top-0 md:w-1/3 bg-white h-full overflow-y-auto
                ${isOpen ? 'translate-x-0 ease-in-out' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}>
                <div className='p-4 mt-4'>
                    <div className='flex items-center justify-between mb-4 px-2'>
                        <h4 className='capitalize text-xl font-semibold'>Your Cart</h4>

                        <button
                            onClick={onClose}
                            className='text-white font-bold hover:text-red-800'><i className="ri-xrp-fill bg-gray-600 hover:bg-gray-800 py-2 px-3"></i></button>

                    </div>

                    <div className='cart-items  space-y-4'>
                        {
                            products.length === 0 ? <div>Your cart is empty</div>
                                : products.map((product, index) => {
                                    return (<div key={index} className='flex  w-full space-y-3 flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4'>
                                        <div className='flex items-center'>
                                            <span className=' py-1 px-2 mr-4 bg-primary text-white rounded-full'>{String(index + 1).padStart(2, '0')}</span>
                                            
                                            <div className='mt-5 '>
                                            <img src={product.image} alt='image' className='size-14 object-cover mr-4 ' />
                                                    <button
                                                    onClick={()=>removeFunction(product._id)}
                                                    className=' text-red-500 mt-3 -translate-x-1 rounded-lg'>Remove</button>

                                                </div>
                                            <div>
                                                <h5 className='text-lg font-medium'>{product.name}</h5>
                                                <p className='text-gray-600 text-sm'>${Number(product.price).toFixed(2)}</p>
                                                
                                            </div>
                                            <div className='flex flex-row md:justify-start justify-end items-center mt-2 gap-2'>
                                                <button
                                                    onClick={() => { handleQuantity('decrement', product._id) }}
                                                    className='size-6 flex items-center justify-center px-2 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8' >-</button>
                                                <span className='px-2 text-center mx-1'>{product.quantity}</span>
                                                <button
                                                    onClick={() => { handleQuantity('increment', product._id) }}
                                                    className='size-6 flex items-center justify-center px-2 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white '>+</button>
                                                
                                            </div>
                                        </div>

                                    </div>)
                                })

                        }
                    </div>
                    {
                        products.length > 0 && (
                            <OrderSummary />
                        )
                    }

                </div>


            </div>
        </div >
    )
}

export default Cartmodel
