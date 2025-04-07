const express=require('express')
const router=express.Router();
const authMiddleware =require('../middlewares/verifyToken')
const reviewModel = require('../models/reviewsModel');
const productModel = require('../models/productModel');

router.post('/postreview',async(req,res)=>{
    const userId=req.userId;
    try{
        const {comment,rating,productId,userId}=req.body;
        if(!comment || !rating || !productId){
            return res.status(400).json({message:'All fields are required'});

        }
        const exsistingReviews = await reviewModel.findOne({productId,userId});
        if(exsistingReviews){
            exsistingReviews.comment=comment;
            exsistingReviews.rating=rating;
            await exsistingReviews.save();
        }
        else{
            const newReview= new reviewModel({...req.body});
            
            await newReview.save();
        }
        const reviews= await reviewModel.find({productId});
        if(reviews.length>0){
            const totalRating=reviews.reduce((acc,review)=>acc+review.rating,0);
            const averageRating=totalRating/reviews.length;
            const product = await productModel.findById(productId);
            if(product){
                product.rating=averageRating;
                await product.save({validateBeforeSave:false});
            }
            else{
                return res.status(404).json({message:'Product not found'});
            }
        }
        return res.status(200).json({message:'Posted review successfully',reviews: reviews});

    }
    catch(err){
        return res.status(500).json({message:`Thre was an error posting review ${err.message}`});
    }
});


router.get('/total-review',async(req,res)=>{
    try{
        const totalReview = reviewModel.countDocuments({});
        res.send(200).json({totalReview});
    }
    catch(err){
        return res.status(500).json({message:`Thre was an error getting total review ${err.message}`});
    }
    
})
router.get('/:userId',async(req,res)=>{
    const userId=req.params;
    if(!userId){
        return res.status(400).json({message:'No userid'});
    }
    try{
        const reviews= await reviewModel.find({userId:userId}).sort({createdAt:-1});
        if(reviews.length===0){
            return res.status(404).json({message:"No reviews by user"});
        }
        return res.status(200).json({reviews})
    }
    catch(err){
        return res.status(500).json({message:`Thre was an error getting reviews by user${err.message}`});
    }
})











module.exports= router;