const express = require('express');
const bcrypt=require('bcrypt');
const userModel=require('../models/useModel');
const jwt=require('jsonwebtoken')


const updateUserRole=async(req,res)=>{
    const role=req.role;
    const {id}=req.params;
    console.log(id);
    if(role!=='admin'){
        return res.status(400).json({message:'Only an admin can change roles'});
    }
    try{
        const user = await userModel.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
       
        if(!user){
            return res.status(400).json({message:'The user does not exsist'});
        }
        return res.status(200).json({message:`The user ${user} role was updated to admin`})
    }
    catch(err){
        return res.status(500).json({message:`There was a backend error ${err.message}`})
    }


}


module.exports={updateUserRole}