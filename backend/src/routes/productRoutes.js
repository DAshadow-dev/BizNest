const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();
const upload = require('../config/multerConfig')

// CRUD routes for Product
router.post('/products', upload.single('image'), ProductController.createProduct); // Create a new product
router.get('/products', ProductController.getAllProducts); // Get all products
router.get('/products/:id', ProductController.getProductById); // Get product by ID
router.put('/products/:id', upload.single('image'), ProductController.updateProduct); // Update product by ID
router.delete('/products/:id', ProductController.deleteProduct); // Delete product by ID

module.exports = router;
