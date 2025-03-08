const checkAdmin = (req, res, next) => {
    try {
        // Kiểm tra nếu user chưa đăng nhập
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Kiểm tra nếu user không phải admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }

        // Nếu là admin, tiếp tục xử lý
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = checkAdmin;
