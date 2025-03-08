const Store = require("../../models/Store");
const User = require("../../models/User");

exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role != "business owner") {
      return res
        .status(400)
        .json({ message: "This action is only for business owners" });
    }

    //Update status
    user.status = "active";
    user.pendingApproval = false;
    await user.save();

    res.status(200).json({ message: "User approved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Store.findOneAndDelete({ ownerId: user._id });
    await User.findByIdAndDelete(user._id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBusinessOwners = async (req, res) => {
  try {
    const businessOwners = await User.find({ role: "business owner" });
    res.status(200).json(businessOwners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleAccountStatus = async (req, res) => {
  try {
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

