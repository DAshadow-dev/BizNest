// controllers/staffController.js
const User = require('../models/User');

const createStaff = async (req, res) => {
    try {
        const { username, password, fullname, email, phone, role, image, status, storeId } = req.body;

        // Kiểm tra xem người dùng có phải là staff không
        if (role !== 'staff') {
            return res.status(400).json({ message: 'Role must be staff' });
        }

        const newStaff = new User({
            username,
            password,
            fullname,
            email,
            phone,
            role,
            image: image || '', // Nếu không có ảnh, để rỗng
            status: status || 'active', // Mặc định là 'active'
            storeId,
        });

        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


const getAllStaff = async (req, res) => {
    try {
        const staffList = await User.find({ role: 'staff' }); // Lọc theo role = staff
        res.status(200).json(staffList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};



const updateStaff = async (req, res) => {
    try {
        const { staffId } = req.params;
        const { username, email, phone, storeId } = req.body;

        const updatedStaff = await User.findByIdAndUpdate(
            staffId,
            { username, email, phone, storeId },
            { new: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.status(200).json(updatedStaff);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


const deleteStaff = async (req, res) => {
    try {
        const { staffId } = req.params;

        const deletedStaff = await User.findByIdAndDelete(staffId);

        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const searchStaff = async (req, res) => {
    try {
        const { query } = req.query; // Lấy từ khóa tìm kiếm từ query params (trên từ khoá phải chứa chữ 'query=')

        // Tìm kiếm với regex trong fullname hoặc các trường khác
        const searchResults = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } }, // Tìm kiếm username// $options: 'i' chấp nhận chữ hoa và chữ thường
                { email: { $regex: query, $options: 'i' } },    // Tìm kiếm email
                { phone: { $regex: query, $options: 'i' } },    // Tìm kiếm phone
            ]
        });

        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'No staff found matching the search criteria' });
        }

        res.status(200).json(searchResults);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = {
    createStaff,
    getAllStaff,
    updateStaff,
    deleteStaff,
    searchStaff,
};


