import { createSlice } from "@reduxjs/toolkit";

const intialState={
    products:[],
    selectedItems:0,
    totalPrice:0,
    tax:0,
    taxRate:0.05,
    grandTotal:0
}
const cartSlice =createSlice({
    name:"Cart",
    initialState:intialState,
    reducers:{
        addToCart:(state,action)=>{
            const isExists=state.products.find((product)=>product._id===action.payload._id);
            if(!isExists){
                
                state.products.push({...action.payload,quantity:1})
            }
            else{
                console.log("Items already exsist");
            }
            state.selectedItems=setSelectedItems(state);
            state.totalPrice=setTotalPrice(state);
            state.tax=setTax(state);
            state.grandTotal=setGrandTotal(state);
        }
    }

})


//utility function

export const setSelectedItems=(state)=>state.products.reduce((total,product)=>{
    return Number(total+product.quantity);
},0)

export const setTotalPrice=(state)=>state.products.reduce((total,product)=>{
    return Number(total+(product.quantity*product.price))
},0);

export const setTax=(state)=>setTotalPrice(state)*state.taxRate;

export const setGrandTotal=(state)=>{
    return setTotalPrice(state)+setTax(state);
}


export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;