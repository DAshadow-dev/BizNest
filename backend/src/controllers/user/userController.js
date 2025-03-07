const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const brcypt = require("bcrypt");

const changePasswordByUser = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword, againNewPassword } = req.body;
    if (!oldPassword || !newPassword || !againNewPassword) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    let user = await User.findOne({ email: req.email });
    if (user && (await brcypt.compare(oldPassword, user.password))) {
      if (oldPassword == newPassword) {
        return res.status(202).json({
          MsgNo: "Mật khẩu mới không được trùng mật khẩu cũ",
        });
      }
      if (newPassword == againNewPassword) {
        user.password = await brcypt.hash(newPassword, 10);
        await user.save();
        return res.status(200).json({
          Data: user,
        });
      } else {
        return res.status(202).json({
          MsgNo: "Mật khẩu mới nhập lại không trùng với mật khẩu mới",
        });
      }
    } else {
      res.status(202).json({
        MsgNo: "Bạn nhập sai mật khẩu rồi",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

const updateInformationByUser = asyncHandler(async (req, res) => {
  try {
    const { email, phone, username, image } = req.body;
    if (!email || !phone || !username || !image) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    let user = await User.findOne({ email: req.email });
    user.email = email;
    user.phone = phone;
    user.username = username;
    user.image = image;
    await user.save();
    res.status(200).json({ Data: user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

//// account management (admin)


module.exports = {
  changePasswordByUser,
  updateInformationByUser
};
