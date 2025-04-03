const express= require('express');
const router= express.Router();
const {register,signIn,logOut,deleteUser,getAllUsers,editProfile,updateUserRole}=require('../controllers/userController.js');
const authMiddleware= require('../middlewares/verifyToken.js');
const userModel = require('../models/useModel.js');
router.post('/register', register);
router.post('/signin', signIn);
router.post('/logout',logOut);
router.delete('/deleteuser',authMiddleware, deleteUser);
router.get('/getusers',getAllUsers);
router.patch('/editprofile',authMiddleware,editProfile);


router.put('/roleupdate/:id',authMiddleware,updateUserRole);







module.exports=router;