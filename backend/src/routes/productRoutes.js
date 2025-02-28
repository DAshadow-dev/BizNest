const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

// CRUD routes for Product
router.post('/products', ProductController.createProduct); // Create a new product
router.get('/products', ProductController.getAllProducts); // Get all products
router.get('/products/:id', ProductController.getProductById); // Get product by ID
router.put('/products/:id', ProductController.updateProduct); // Update product by ID
router.delete('/products/:id', ProductController.deleteProduct); // Delete product by ID

module.exports = router;
