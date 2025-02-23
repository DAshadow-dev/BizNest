const asyncHandler= require('express-async-handler');
const User= require('../models/User');
const brcypt= require('bcrypt');

const changePasswordByUser= asyncHandler( async (req, res) => {
    try{
        const {oldPassword, newPassword, againNewPassword}= req.body;
        if(!oldPassword || !newPassword || !againNewPassword){
            res.status(400);
            throw new Error("All fields are mandatory!")
        }
        let user= await User.findOne({email: req.user.email});
        if(user && (await brcypt.compare(oldPassword, user.password))){
            if(newPassword == againNewPassword){
                user.password= await brcypt.hash(newPassword, 10); 
                await user.save();
                res.status(200).json(user);
            }else{
                res.status(400);
                throw new Error("Mật khẩu mới nhập lại không trùng với mật khẩu mới"); 
            }
        }else{
            res.status(400);
            throw new Error("Bạn nhập sai mật khẩu rồi");
        }
        
    }catch(error){
        res.status(400);
        throw new Error(error);
    }
})

const updateInformationByUser= asyncHandler( async (req, res) => {
    try{
        const {email, phone, username, image}= req.body;
        if(!email || !phone || !username || !image){
            res.status(400);
            throw new Error("All fields are mandatory!")
        }
        let user= await User.findOne({email: req.user.email});
        user.email= email;
        user.phone= phone;
        user.username= username;
        user.image= image;
        await user.save();
        res.status(200).json(user);
    }catch(error){
        res.status(400);
        throw new Error(error);
    }
})

module.exports= {changePasswordByUser, updateInformationByUser};