const express = require('express');

const productModel = require('../models/productModel');
const reviewModel = require('../models/reviewsModel')


const createProduct = async (req, res) => {
    if(req.role!=="admin"){
        return res.status(400).json({message:'Only admin can create '})
    }
    try {
        const newProduct = new productModel({ ...req.body });
        const savedProduct = await newProduct.save();
        const reviews = await reviewModel.find({ productId: savedProduct._id });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            savedProduct.rating = averageRating;
            await savedProduct.save();
        }
        return res.status(201).json({ message: `Product created successfullt ${savedProduct}` })
    }
    catch (err) {
        return res.status(500).json({ message: `There was a backend error ${err.message}` });
    }

}

const getProduct = async (req,res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (color && color !== 'all') {
            filter.color = color;
        }
        if(minPrice || maxPrice){
            filter.price={};
            const min=parseFloat(minPrice);
            const max=parseFloat(maxPrice);
            if(!isNaN(min)){
                
                filter.price.$gte=min;
            }
            if(!isNaN(max)){
                filter.price.$lte=max;
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await productModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await productModel.find(filter).skip(skip).
            limit(parseInt(limit))
            .populate("author", "email").
            sort({ createdAt: -1 });
        return res.status(200).json({ products, totalPages, totalProducts });
    }
    catch (err) {
        return res.status(500).json({ message: `There was a backend error ${err.message}` });
    }


}
const getSingleProduct=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(400).json({message:'No id in params'});
    }
    try{
        const product=await productModel.findById(id).populate('author' , 'email userName');
        if(!product){
            return res.status(404).json({message:'product not found'});
        }
        const reviews=await reviewModel.findById(id).populate('userId', 'email userName')
        return res.status(200).json({Products:product,Reviews:reviews})
    }
    catch (err) {
        return res.status(500).json({ message: `There was a backend error ${err.message}` });
    }

}

const updateProduct = async(req,res)=>{
    const {id}=req.params;
    const role=req.role;
    if(role!=="admin"){
        return res.status(400).json({message:'Only admins can use this route'})
    }
    try{
        const updatedProduct= await productModel.findByIdAndUpdate(id,{...req.body},{new: true});
        if(!updatedProduct){
            return res.status(404).json({message:'Product not found'});
            
        }
        return res.status(200).json({message:`The product was updated ${updatedProduct}`})

    }
    catch(err){
        return res.status(500).json({ message: `There was a backend error updating the error ${err.message}` });
    }
}

const deleteProduct=async(req,res)=>{
    const id=req.params.id;
    const role=req.role;
    if(role!=="admin"){
        return res.status(400).json({message:'Only admins can use this route'});
    }
    try{
        const deletedProduct= await productModel.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({message:'The product does not exsists'});

        }
        //reviews delted
        await reviewModel.deleteMany({productId:id});
        return res.status(200).json({message:'Prouct delted successfully',deletedProduct})

    }
    catch(err){
        Console.error("Error deleting the product")
        return res.status(500).json({ message: `There was a backend error while deleting. the error ${err.message}` });
    }
}

const relatedProduct=async(req,res)=>{
    try{
      const id =req.params.id;
      if(!id){
        return res.status(404).json({message:'No product id'});
      }  
      const product=await productModel.findById(id);
      if(!product){
        return res.status(404).json({message:'No product found'});
      }
      const titleRegex= new RegExp(
        product.name
        .split(" ")
        .filter(word=>word.length>1)
        .join("|"),
        "i"
      );
      const relatedProducts=await productModel.find(
        {
            _id:{$ne:id},
            $or:[
                {name: {$regex:titleRegex}},
                {category:product.category},
                
            ]
        }
      )
      return res.status(200).json({relatedProducts});

    }
    catch(err){
        return res.status(500).json({ message: `There was a backend error while fetching related product. the error ${err.message}` });
    }
}











module.exports = { createProduct, getProduct,getSingleProduct,updateProduct,deleteProduct,relatedProduct }