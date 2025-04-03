const express = require('express');
const bcrypt=require('bcrypt');
const userModel=require('../models/useModel');
const jwt=require('jsonwebtoken');

const register= async(req,res)=>{
    const {userName,email,password,role}=req.body;
    if(!userName || !email || !password){
        return res.status(400).json({message:'Please Provide correct cred'});
    }
    const hashPassword= await bcrypt.hash(password,8);
    try{
         await userModel.create({userName,email,password:hashPassword,role});
         return res.status(201).json({message:'User Created'});
    }
    catch(err){
        return res.status(500).json({message:`Internal Server Error ${err.message}`})

    }


}

const signIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message:'The user with the proived email does not exsits.'});

        }
        if( !await bcrypt.compare(password,user.password)){
            return res.status(401).json({message:'Incorrect Password'});
        }
        const token= jwt.sign({id:user._id , role:user.role},process.env.JWT_USER,{expiresIn:'1hr'});
        
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        })
        return res.status(200).json({message:'Logged in Successfully',user:user,token:token});
    }
    catch(err){
        return res.status(500).json({message:'There was an server error',error:err.message})
    }


}

const logOut=async(req,res)=>{
    const cookie=req.cookies.token;
    
    if(!cookie){
        return res.status(404).json({message:'There were no cookies found'});
    }
    res.clearCookie('token');
    return res.status(200).json({message:"Logged out successfully"});

}

const deleteUser=async(req,res)=>{
    const userId=req.userId;
    
    res.clearCookie('token');
    if(!userId){
        return res.status(400).json({message:'There was no id in params'});
    }
    try{
        const user= await userModel.findByIdAndDelete(userId);
        
        if(!user){
            return res.status(404).json({message:'The user was not found'});
        }
        return res.status(200).json({message:'The user was deleted'});
    }
    catch(err){
        return res.status(500).json({message:'There was a backend error while delteing the user',error:err.message});
    }

}

const getAllUsers=async(req,res)=>{
    try{
        const users=await userModel.find({},'id email role').sort({createdAt: -1});
        if(!users){
            return res.status(404).json({message:'No users found'});
        }
        return res.status(200).json({message:'The users are ',Users:users});
    }
    catch(err){
        return res.status(500).json({message:`There was a backend error ${err.message}`});
    }
}


const editProfile=async(req,res)=>{
    const userId=req.userId;
    const {userName,profileImage}=req.body;
    if(!userId){
        return res.status(404).json({message:'The userId is not found'});
    }
    try{
        const user=await userModel.findById(userId);
        if(userName!==undefined){
            user.userName=userName;
        }
        if(profileImage!==undefined){
            user.profileImage=profileImage;
        }
        await user.save();
        return res.status(200).json({message:'Profile updated',user:user})
    }
    catch(err){
        return res.status(500).json({message:`There was a backend error ${err.message}`});
    }
}

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








module.exports={register,signIn,logOut,deleteUser,getAllUsers,editProfile,updateUserRole};