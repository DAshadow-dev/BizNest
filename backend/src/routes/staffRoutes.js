// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const upload = require('../config/multerConfig')

// Đặt route tìm kiếm ở một đường dẫn riêng biệt
router.get('/staff/search', staffController.searchStaff); // Tìm kiếm staff - đường dẫn riêng biệt

// Các route CRUD cơ bản cho staff
router.post('/staff', upload.single('image'), staffController.createStaff); // Thêm staff mới
router.get('/staff', staffController.getAllStaff); // Lấy danh sách staff
router.get('/staff/:staffId', staffController.getStaffById); // Lấy staff theo ID
router.put('/staff/:staffId', upload.single('image'), staffController.updateStaff); // Cập nhật staff
router.delete('/staff/:staffId', staffController.deleteStaff); // Xóa staff

module.exports = router;
