const express= require('express');
const router= express.Router();
const authMiddleware= require('../middlewares/verifyToken.js');
const {updateUserRole}=require('../controllers/adminController.js');

router.put('/roleupdate/:id',authMiddleware,updateUserRole);


module.exports= router;