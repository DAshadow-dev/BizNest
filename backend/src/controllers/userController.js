const asyncHandler= require('express-async-handler');
const User= require('../models/User');
const brcypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const changePasswordByUser= asyncHandler( async (req, res) => {
    try{
        const {oldPassword, newPassword, againNewPassword}= req.body;
        if(!oldPassword || !newPassword || !againNewPassword){
            res.status(400);
            throw new Error("All fields are mandatory!")
        }
        const user= await User.findOne({email: req.email});
        if(user && (await brcypt.compare(oldPassword, user.password))){
            if(newPassword == againNewPassword){
                
            }
        }
    }catch{
        res.status(400);
        throw new Error("System is error");
    }

})

module.exports= {changePasswordByUser};