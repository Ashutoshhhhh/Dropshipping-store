const express = require('express');

const productModel = require('../models/productModel');
const reviewModel = require('../models/reviewsModel')


const createProduct = async (req, res) => {
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
        const { category, color, minprice, maxprice, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (color && color !== 'all') {
            filter.color = color;
        }
        if(minprice || maxprice){
            filter.price={};
            const min=parseFloat(minprice);
            const max=parseFloat(maxprice);
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















module.exports = { createProduct, getProduct,getSingleProduct }