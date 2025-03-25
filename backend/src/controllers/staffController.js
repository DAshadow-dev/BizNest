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

      // Kiểm tra storeId được cung cấp
      if (!storeId) {
        return res.status(400).json({ msgNo: 'Store ID is required', Data: null });
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
      console.log('>>>> get all staff');
      const { storeId } = req.query;
      
      // Nếu có storeId, lọc nhân viên theo cửa hàng
      let filter = { role: 'staff' };
      if (storeId) {
        // Convert storeId to number to ensure type matching with database
        // MongoDB will convert string to number in the query but being explicit helps with debugging
        filter.storeId = Number(storeId);
        console.log('>>>> Filtering staff by storeId:', filter.storeId, typeof filter.storeId);
      }
      
      // Tìm tất cả nhân viên theo filter
      const staffList = await User.find(filter);
      console.log(`>>>> Found ${staffList.length} staff members with filter:`, filter);
      
      res.status(200).json({msgNo: "get all staff successful", Data: staffList});
    } catch (err) {
      console.error('>>>> Error in getAllStaff:', err);
      res.status(500).json({ msgNo: 'Server error', Data: null });
    }
};



const updateStaff = async (req, res) => {
    try {
      const { staffId } = req.params;
      const { username, email, phone, storeId, status } = req.body;
      const image = req.file; // Multer sẽ tự động gán file vào req.file
      console.log('>>> Update Staff Request Body:', req.body);
      console.log('>>> Update Staff Image File:', image);
  
      // Tìm nhân viên hiện tại để lấy thông tin ảnh cũ nếu cần
      const existingStaff = await User.findById(staffId);
      if (!existingStaff) {
        return res.status(404).json({ msgNo: 'Staff not found', Data: null });
      }
      
      // Kiểm tra nếu nhân viên thuộc về cửa hàng khác (nếu storeId được cung cấp)
      if (storeId && existingStaff.storeId && existingStaff.storeId.toString() !== storeId.toString()) {
        return res.status(403).json({ msgNo: 'You cannot update staff from another store', Data: null });
      }
  
      // Xử lý ảnh
      let imageUrl = '';
      
      // Nếu có file ảnh mới, upload lên Cloudinary
      if (image) {
        console.log('>>> Uploading new image to Cloudinary');
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'staff_images',
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = result.secure_url;
        console.log('>>> New image URL:', imageUrl);
      } 
      // Nếu có URL ảnh trong request body, sử dụng URL đó
      else if (req.body.image) {
        console.log('>>> Using image URL from request body');
        imageUrl = req.body.image;
      } 
      // Nếu không có ảnh mới và không có URL trong request, giữ nguyên ảnh cũ
      else {
        console.log('>>> Keeping existing image URL');
        imageUrl = existingStaff.image || '';
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
          image: imageUrl,
        },
        { new: true }
      );
  
      res.status(200).json({ msgNo: 'update staff successful', Data: updatedStaff });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msgNo: 'Server error', Data: null });
    }
  };
  

const deleteStaff = async (req, res) => {
    try {
        const { staffId } = req.params;
        const { storeId } = req.query;  // Lấy storeId từ query params
        
        console.log(`>>>> Deleting staff with ID: ${staffId} for storeId: ${storeId}`);

        // Tìm nhân viên và kiểm tra nếu thuộc về cửa hàng đang yêu cầu
        const staff = await User.findById(staffId);
        
        if (!staff) {
            return res.status(404).json({ msgNo: 'Staff not found', Data: null });
        }
        
        // Kiểm tra nếu nhân viên thuộc về cửa hàng khác
        if (storeId && staff.storeId) {
            const requestStoreId = Number(storeId);
            const staffStoreId = Number(staff.storeId);
            
            console.log(`>>>> Comparing storeIds: Request=${requestStoreId}(${typeof requestStoreId}), Staff=${staffStoreId}(${typeof staffStoreId})`);
            
            if (requestStoreId !== staffStoreId) {
                return res.status(403).json({ msgNo: 'You cannot delete staff from another store', Data: null });
            }
        }

        const deletedStaff = await User.findByIdAndDelete(staffId);
        res.status(200).json({msgNo: "delete successful", Data: deletedStaff});
    } catch (err) {
        res.status(500).json({ msgNo: 'Server error', Data: null });
    }
};

// Hàm tìm kiếm nhân viên
const searchStaff = async (req, res) => {
  try {
    const { query, storeId } = req.query;
    console.log(`>>>> Searching staff with query: ${query} for storeId: ${storeId}`);
    
    if (!query) {
      return res.status(400).json({ msgNo: 'Search query is required', Data: null });
    }

    // Tạo điều kiện tìm kiếm
    let filter = {
      role: 'staff',
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ]
    };

    // Nếu có storeId, thêm vào filter
    if (storeId) {
      filter.storeId = Number(storeId);
      console.log('>>>> Added storeId to filter:', filter.storeId, typeof filter.storeId);
    }

    const staffList = await User.find(filter);
    console.log(`>>>> Found ${staffList.length} staff matching query with filter:`, filter);

    res.status(200).json({msgNo: "search staff successful", Data: staffList});
  } catch (err) {
    console.error('>>>> Error in searchStaff:', err);
    res.status(500).json({ msgNo: 'Server error', Data: null });
  }
};

const getStaffById = async (req, res) => {
    try {
      const { staffId } = req.params;  // Lấy staffId từ params
      const { storeId } = req.query;   // Lấy storeId từ query params
      
      console.log(`>>>> Getting staff with ID: ${staffId} for storeId: ${storeId}`);
  
      // Tìm nhân viên theo ID
      const staff = await User.findById(staffId);
  
      // Kiểm tra xem nhân viên có tồn tại không
      if (!staff) {
        return res.status(404).json({ msgNo: 'Staff not found', Data: null });
      }
      
      // Kiểm tra nếu nhân viên thuộc về cửa hàng khác
      if (storeId && staff.storeId) {
        const requestStoreId = Number(storeId);
        const staffStoreId = Number(staff.storeId);
        
        console.log(`>>>> Comparing storeIds: Request=${requestStoreId}(${typeof requestStoreId}), Staff=${staffStoreId}(${typeof staffStoreId})`);
        
        if (requestStoreId !== staffStoreId) {
          return res.status(403).json({ msgNo: 'You cannot view staff from another store', Data: null });
        }
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


