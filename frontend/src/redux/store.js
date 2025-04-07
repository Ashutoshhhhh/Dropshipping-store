import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'
import { authApi } from "./features/auth/authApi";
import authReducer from './features/auth/authSlice'
import { productsAPI } from "./features/products/productAPI";
import {reviewApi} from "./features/review/reviewAPI";
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        [authApi.reducerPath]  : authApi.reducer,
        auth:authReducer,
       [productsAPI.reducerPath]: productsAPI.reducer,
       [reviewApi.reducerPath]:reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productsAPI.middleware,reviewApi.middleware),
})