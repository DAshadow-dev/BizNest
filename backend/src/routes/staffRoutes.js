// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/staff', staffController.createStaff); // Thêm staff mới
router.get('/staff', staffController.getAllStaff); // Lấy danh sách staff
router.put('/staff/:staffId', staffController.updateStaff); // Cập nhật staff
router.delete('/staff/:staffId', staffController.deleteStaff); // Xóa staff

module.exports = router;
