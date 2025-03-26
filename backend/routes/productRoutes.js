const express=require('express')
const router=express.Router();
const{createProduct,getProduct,getSingleProduct} = require('../controllers/productController')


router.post('/create-product',createProduct);
router.get('/getproducts',getProduct);
router.get('/:id',getSingleProduct);












module.exports=router; 