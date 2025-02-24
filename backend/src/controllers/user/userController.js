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
                res.status(400);
                throw new Error("Mật khẩu mới không được trùng mật khẩu cũ")
            }
            if(newPassword == againNewPassword){
                user.password= await brcypt.hash(newPassword, 10); 
                await user.save();
                res.status(200).json({ message: "Đổi mật khẩu thành công!" });
            }else{
                res.status(400).json({ message: "Mật khẩu mới nhập lại không trùng với mật khẩu mới" });
            }
        }else{
            res.status(401).json({ message: "Bạn nhập sai mật khẩu rồi" });
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
        res.status(200).json({messge: "Update information customer successfully!"});
    }catch(error){
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
})

module.exports= {changePasswordByUser, updateInformationByUser};