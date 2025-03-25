const cloudinary = require('../config/cloundinaryConfig');
const Product = require('../models/Product');
const { constants } = require('../utils/consts'); // Import constants

exports.createProduct = async (req, res) => {
  try {
    const { name, categoryId, color, size, price, quantity, description, brand, storeId } = req.body;
    console.log('>>>> Request Body:', req.body);
    console.log('>>>> File:', req.file);

    // Validate storeId is provided
    if (!storeId) {
      return res.status(400).json({ msgNo: 'Store ID is required', Data: null });
    }

    // Kiểm tra xem có đủ dữ liệu để tạo sản phẩm không
    if (!name || !categoryId || !color || !size || !price || !quantity || !description || !brand) {
      console.log('Missing required fields');
      return res.status(400).json({ msgNo: 'All fields are required', Data: null });
    }

    let imageUrl = '';

    // Nếu ảnh là file (multipart)
    if (req.file) {
      console.log('Multipart file upload detected');
      try {
        // Upload file lên Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'product_images',
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = result.secure_url;
        console.log('File uploaded to Cloudinary:', imageUrl); // Added log for successful upload
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ msgNo: 'Error uploading file', Data: null });
      }
    }

    // Đảm bảo categoryId là số và hợp lệ
    const parsedCategoryId = parseInt(categoryId) || 1;
    console.log('Parsed categoryId:', parsedCategoryId);

    // Tạo mới sản phẩm - KHÔNG chỉ định _id, để MongoDB tự tạo
    const newProduct = new Product({
      name,
      categoryId: parsedCategoryId,
      color,
      size,
      price,
      quantity,
      description,
      image: imageUrl, // Gán URL ảnh từ Cloudinary vào
      brand,
      storeId,
    });

    // Lưu sản phẩm mới vào database
    await newProduct.save();
    console.log('Product saved to database:', newProduct); // Added log for successful save

    // Trả về thông tin sản phẩm đã tạo
    res.status(201).json({ msgNo: 'Product created successfully', Data: newProduct });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ msgNo: error.message, Data: null });
  }
};

// Get all products by store ID
exports.getAllProducts = async (req, res) => {
  try {
    // Get storeId from query parameter instead of body
    const storeId = req.query.storeId;
    
    console.log('Received request for getAllProducts with storeId:', storeId);
    
    if (!storeId) {
      console.log('No storeId provided, returning error');
      return res.status(400).json({ msgNo: 'Store ID is required', Data: null });
    }

    console.log('Querying products with storeId:', storeId);
    // Populate cả storeId và categoryId để lấy thông tin đầy đủ
    const products = await Product.find({ storeId: storeId })
      .populate({ 
        path: 'categoryId',
        select: '_id name description image' // Chỉ lấy những trường cần thiết
      })
      .populate({
        path: 'storeId',
        select: '_id name address'
      });
    
    console.log('Found products:', products.length);
    
    res.status(200).json({ msgNo: "get all product successful", Data: products });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(constants.SERVER_ERROR).json({ msgNo: error.message, Data: null });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const storeId = req.query.storeId;
    
    if (!storeId) {
      return res.status(400).json({ msgNo: 'Store ID is required', Data: null });
    }

    // Populate đầy đủ thông tin về category và store
    const product = await Product.findOne({ _id: id, storeId: storeId })
      .populate({ 
        path: 'categoryId',
        select: '_id name description image' // Chỉ lấy những trường cần thiết
      })
      .populate({
        path: 'storeId',
        select: '_id name address'
      });
    
    if (!product) {
      return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found', Data: null });
    }
    
    res.status(200).json({ msgNo: "get product successful", Data: product });
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ msgNo: error.message, Data: null });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, color, size, price, quantity, description, brand, storeId } = req.body;
    
    // Validate storeId is provided
    if (!storeId) {
      return res.status(400).json({ msgNo: 'Store ID is required', Data: null });
    }
    
    // Check if all required fields are provided
    if (!name || !categoryId || !color || !size || !price || !quantity || !description || !brand) {
      console.log('Missing required fields');
      return res.status(400).json({ msgNo: 'All fields are required', Data: null });
    }

    // Check if product exists and belongs to the store
    const existingProduct = await Product.findOne({ _id: id, storeId: storeId });
    if (!existingProduct) {
      return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found in this store', Data: null });
    }

    let imageUrl = req.body.image; // Keep the existing image if no new image is provided
    
    // If the image is a file (multipart)
    if (req.file) {
      console.log('Multipart file upload detected');
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'product_images',
          use_filename: true,
          unique_filename: false,
        });
        imageUrl = result.secure_url;
        console.log('File uploaded to Cloudinary:', imageUrl); // Log successful upload
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ msgNo: 'Error uploading file', Data: null });
      }
    }
    
    // Đảm bảo categoryId là số và hợp lệ
    const parsedCategoryId = parseInt(categoryId) || existingProduct.categoryId;
    console.log('Parsed categoryId for update:', parsedCategoryId);
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        categoryId: parsedCategoryId,
        color,
        size,
        price,
        quantity,
        description,
        image: imageUrl, // Assign the Cloudinary URL to the image field
        brand,
        storeId,
      },
      { new: true }
    ).populate({ 
      path: 'categoryId',
      select: '_id name description image' // Populate category sau khi update
    }).populate({
      path: 'storeId',
      select: '_id name address'
    });

    console.log('Product updated in database:', updatedProduct); // Log successful update
    // Return the updated product information
    res.status(200).json({ msgNo: 'Product updated successfully', Data: updatedProduct });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ msgNo: error.message, Data: null });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const storeId = req.query.storeId;
    
    if (!storeId) {
      return res.status(400).json({ msgNo: 'Store ID is required', Data: null });
    }

    // Check if product exists and belongs to the store
    const existingProduct = await Product.findOne({ _id: id, storeId: storeId });
    if (!existingProduct) {
      return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found in this store', Data: null });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ msgNo: 'delete product success', Data: null });
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ msgNo: error.message, Data: null });
  }
};
