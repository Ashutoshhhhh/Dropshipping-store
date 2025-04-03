const express=require('express')
const router=express.Router();
const{createProduct,getProduct,getSingleProduct,updateProduct,deleteProduct,relatedProduct} = require('../controllers/productController')
const authMiddleware =require('../middlewares/verifyToken')

router.post('/create-product',authMiddleware,createProduct);
router.get('/getproducts',getProduct);
router.get('/:id',getSingleProduct);
router.patch('/updateproduct/:id',authMiddleware, updateProduct)
router.delete('/:id',authMiddleware,deleteProduct)
router.get('/related/:id',relatedProduct)









module.exports=router; 