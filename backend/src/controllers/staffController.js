// controllers/staffController.js
const User = require('../models/User');
const cloudinary = require('../config/cloundinaryConfig');

const createStaff = async (req, res) => {
    try {
      const { username, password, email, phone, role, status, storeId } = req.body;
      const image = req.file; // Multer sẽ tự động gán file vào req.file
      console.log('>>>>', req.body);
      console.log('>>>> file', image);
  
      // Kiểm tra xem người dùng có phải là staff không
      if (role !== 'staff') {
        return res.status(400).json({ msgNo: 'Role must be staff', Data: null });
      }
  
      // Nếu có ảnh, kiểm tra URL ảnh, không cần upload lên Cloudinary
      let imageUrl = '';
      if (image) {
        // Nếu là base64 hoặc file, upload lên Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'staff_images',
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = result.secure_url; // Lấy URL ảnh sau khi upload
        console.log('>>>', imageUrl);
      }
  
      // Tạo mới nhân viên
      const newStaff = new User({
        username,
        password,
        email,
        phone,
        role,
        image: imageUrl || '', // Nếu không có ảnh, để rỗng
        status: status || 'active',
        storeId,
      });
  
      await newStaff.save();
      res.status(201).json({ msgNo: 'save staff successful', Data: newStaff });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msgNo: 'Server error', Data: null });
    }
  };
  


const getAllStaff = async (req, res) => {
    try {
        const staffList = await User.find({ role: 'staff' }); // Lọc theo role = staff
        res.status(200).json({msgNo: "get all staff successful",Data: staffList});
    } catch (err) {
        res.status(500).json({ msgNo: 'Server error', Data: null });
    }
};



const updateStaff = async (req, res) => {
    try {
      const { staffId } = req.params;
      const { username, email, phone, storeId, status } = req.body;
      const image = req.file; // Multer sẽ tự động gán file vào req.file
      console.log('>>>', req.body)
  
      // Kiểm tra xem có ảnh mới không
      let imageUrl = '';
      if (image) {
        // Nếu là base64 hoặc file, upload lên Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'staff_images',
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = result.secure_url; // Lấy URL ảnh sau khi upload
        console.log('>>>', imageUrl);
      }
  
      // Cập nhật thông tin nhân viên
      const updatedStaff = await User.findByIdAndUpdate(
        staffId,
        {
          username,
          email,
          phone,
          storeId,
          status,
          image: imageUrl || '', // Nếu không có ảnh mới, giữ nguyên hoặc để rỗng
        },
        { new: true }
      );
  
      if (!updatedStaff) {
        return res.status(404).json({ msgNo: 'Staff not found', Data: null });
      }
  
      res.status(200).json({ msgNo: 'update staff successful', Data: updatedStaff });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msgNo: 'Server error', Data: null });
    }
  };
  

const deleteStaff = async (req, res) => {
    try {
        const { staffId } = req.params;

        const deletedStaff = await User.findByIdAndDelete(staffId);

        if (!deletedStaff) {
            return res.status(404).json({ msgNo: 'Staff not found', Data: null });
        }

        res.status(200).json({msgNo: "delete successful",Data: deletedStaff});
    } catch (err) {
        res.status(500).json({ msgNo: 'Server error', Data: null });
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

        res.status(200).json({msgNo: "find successful",Data: searchResults});
    } catch (err) {
        res.status(500).json({ msgNo: 'Server error', Data: null });
    }
};

const getStaffById = async (req, res) => {
    try {
      const { staffId } = req.params;  // Lấy staffId từ params
  
      // Tìm nhân viên theo ID
      const staff = await User.findById(staffId);
  
      // Kiểm tra xem nhân viên có tồn tại không
      if (!staff) {
        return res.status(404).json({ msgNo: 'Staff not found', Data: null });
      }
  
      // Trả về thông tin nhân viên
      res.status(200).json({ msgNo: 'Staff found', Data: staff });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msgNo: 'Server error', Data: null });
    }
  };

module.exports = {
    createStaff,
    getAllStaff,
    updateStaff,
    deleteStaff,
    searchStaff,
    getStaffById,
};


