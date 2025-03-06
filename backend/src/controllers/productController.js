const cloudinary = require('../config/cloundinaryConfig');
const Product = require('../models/Product');
const { constants } = require('../utils/consts'); // Import constants



// create product
exports.createProduct = async (req, res) => {
  try {
    const { name, categoryId, color, size, price, quantity, description,image, brand, storeId } = req.body;
    console.log('>>>>',req.body)
    console.log('>>>> file', req.file); // Kiểm tra file đã được upload chưa

    // Kiểm tra xem có đủ dữ liệu để tạo sản phẩm không
    if (!name || !categoryId || !color || !size || !price || !quantity || !description || !req.file || !brand || !storeId) {
      return res.status(400).json({ msgNo: 'All fields are required', Data: null });
    }

    // Xử lý upload ảnh
    let imageUrl = '';

    // Nếu ảnh là URL
    if (image && image.startsWith('http')) {
      imageUrl = image;
    }
    // Nếu ảnh là base64
    else if (image && image.startsWith('data:image')) {
      console.log('Base64 image detected');
      const result = await cloudinary.uploader.upload(image, {
        folder: 'product_images',
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;
    }
    // Nếu ảnh là file (local)
    else if (req.file) {
      console.log('File upload detected');
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'product_images',
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;
    }

    // Tạo mới sản phẩm
    const newProduct = new Product({
      name,
      categoryId,
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

    // Trả về thông tin sản phẩm đã tạo
    res.status(201).json({ msgNo: 'Product created successfully', Data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msgNo: error.message, Data: null });
  }
};


// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('storeId categoryId');
    res.status(200).json({msgNo: "get all product successful",Data: products});
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ msgNo: error.message, Data: null });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('storeId categoryId');
    if (!product) {
      return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found', Data: null });
    }
    res.status(200).json({msgNo: "get product successful",Data: product});
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ msgNo: error.message, Data: null });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, categoryId, color, size, price, quantity, description, image, brand, storeId } = req.body;
    const updatedProduct = await Product.findById(req.params.id);

    if (!updatedProduct) {
      return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found', Data: null });
    }

    // Lưu trữ ảnh cũ nếu không có ảnh mới
    let imageUrl = updatedProduct.image;

    // Nếu có ảnh mới và ảnh là URL
    if (image && image.startsWith('http')) {
      imageUrl = image;
    }
    // Nếu ảnh là base64
    else if (image && image.startsWith('data:image')) {
      console.log('Base64 image detected');
      const result = await cloudinary.uploader.upload(image, {
        folder: 'product_images',
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;
    }
    // Nếu ảnh là file (local)
    else if (req.file) {
      console.log('File upload detected');
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'product_images',
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;
    }

    // Cập nhật sản phẩm với thông tin mới
    updatedProduct.name = name || updatedProduct.name;
    updatedProduct.categoryId = categoryId || updatedProduct.categoryId;
    updatedProduct.color = color || updatedProduct.color;
    updatedProduct.size = size || updatedProduct.size;
    updatedProduct.price = price || updatedProduct.price;
    updatedProduct.quantity = quantity || updatedProduct.quantity;
    updatedProduct.description = description || updatedProduct.description;
    updatedProduct.image = imageUrl; // Cập nhật URL ảnh
    updatedProduct.brand = brand || updatedProduct.brand;
    updatedProduct.storeId = storeId || updatedProduct.storeId;

    await updatedProduct.save();
    res.status(200).json({ msgNo: "update product successful", Data: updatedProduct });

  } catch (error) {
    console.error(error);
    res.status(constants.VALIDATION_ERROR).json({ msgNo: error.message, Data: null });
  }
};


// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found', Data: null });
    }
    res.status(200).json({ msgNo: 'delete product success', Data: null });
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ msgNo: error.message, Data: null });
  }
};
