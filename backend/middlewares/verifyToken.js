const express = require('express');
const jwt=require('jsonwebtoken');

const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;
    
    if(!token){
        return res.status(400).json({message:'Please log in again'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_USER);
        if(!decoded){
            return res.status(401).json({message:'The token was invalid'})
        }
        
        req.userId=decoded.id;
        req.role=decoded.role;
        
        
        next();
    }
    catch(err){
        return res.status(400).json({message:"There was a error in authentication ", error:err.message})
    }

}

module.exports=authMiddleware;