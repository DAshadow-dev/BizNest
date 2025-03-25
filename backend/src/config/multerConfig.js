const fs = require('fs');
const multer = require('multer');
const path = require('path');

const uploadDirectory = path.resolve(__dirname, '../uploads');

// Kiểm tra nếu thư mục không tồn tại, tạo nó
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Cấu hình Multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Lưu file vào thư mục uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file duy nhất
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
