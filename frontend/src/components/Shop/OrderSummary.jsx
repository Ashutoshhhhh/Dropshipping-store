import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice';
const OrderSummary = () => {
    const products =useSelector((state) => state.cart.products);
    const {tax,taxRate,totalPrice,grandTotal,selectedItems}=useSelector((store)=>store.cart);
    const dispatch=useDispatch();

    const removeCart=()=>{
        dispatch(clearCart())
    }

  return (
    <div className='bg-primary-light mt-5  rounded text-base '>
        <div className='px-6 py-4 space-y-5 '>
            <h2 className='text-2xl font-bold text-text-dark'>Order Summary</h2>
            <p className='text-text-dark mt-2 '>Selected Items: {selectedItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)} Tax Rate: {taxRate}</p>
            <h3 className='font-bold'>Grand Total: ${grandTotal.toFixed(2)}</h3>
            <div className='px-4 mb-6  flex justify-center gap-10'>
                <button 
                onClick={(e)=>{e.preventDefault();removeCart()}}
                className='bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded-lg shadow-lg  px-3 py-2 '>Clear Cart</button>
                <button className='bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded-lg shadow-lg  px-3 py-2 ' >Checkout </button>
            </div>
        </div>
      
    </div>
  )
}

export default OrderSummary
