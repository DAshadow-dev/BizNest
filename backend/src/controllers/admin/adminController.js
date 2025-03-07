const User = require("../../models/User");

const getBusinessOwners = async (req, res) => {
  try {
    // if (req.user.role !== 'admin') {
    //     return res.status(403).json({ message: "Access denied" });
    // }

    const businessOwners = await User.find({ role: "business owner" });
    res.status(200).json(businessOwners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Khoá hoặc mở khoá tài khoản (chỉ Admin có quyền)
const toggleAccountStatus = async (req, res) => {
  try {
    // if (req.user.role !== 'admin') {
    //     return res.status(403).json({ message: "Access denied" });
    // }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();

    res
      .status(200)
      .json({ message: `User ${user.username} is now ${user.status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBusinessOwners,
  toggleAccountStatus,
};
