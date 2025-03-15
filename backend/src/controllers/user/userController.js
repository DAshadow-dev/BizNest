const asyncHandler= require('express-async-handler');
const User= require('../../models/User');
const brcypt= require('bcrypt');

const changePasswordByUser= asyncHandler( async (req, res) => {
    try{
        const {oldPassword, newPassword, againNewPassword}= req.body;
        if(!oldPassword || !newPassword || !againNewPassword){
            res.status(400);
            throw new Error("All fields are mandatory!")
        }
        let user= await User.findOne({email: req.email});
        if(user && (await brcypt.compare(oldPassword, user.password))){
            if(oldPassword == newPassword){
                return res.status(202).json({
                    MsgNo: "New password cannot be same old password",
                })
            }
            if(newPassword == againNewPassword){
                user.password= await brcypt.hash(newPassword, 10); 
                await user.save();
                return res.status(200).json({ 
                    Data: user 
                });
            }else{
                return res.status(202).json({ 
                    MsgNo: "New password must match new password." 
                });
            }
        }else{
            res.status(202).json({ 
                MsgNo: "You entered the wrong password." 
            });
        }
    }catch(error){
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
})

const updateInformationByUser= asyncHandler( async (req, res) => {
    try{
        const {email, phone, username, image}= req.body;
        if(!email || !phone || !username || !image){
            res.status(400);
            throw new Error("All fields are mandatory!")
        }
        let user= await User.findOne({email: req.email});
        user.email= email;
        user.phone= phone;
        user.username= username;
        user.image= image;
        await user.save();
        return res.status(200).json({Data: user});
    }catch(error){
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
})

module.exports= {changePasswordByUser, updateInformationByUser};