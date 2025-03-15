const cloudinary = require('../config/cloundinaryConfig');
const Product = require('../models/Product');
const { constants } = require('../utils/consts'); // Import constants



// create product
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, categoryId, color, size, price, quantity, description,image, brand, storeId } = req.body;
//     console.log('>>>>',req.body)
//     console.log('>>>> file', req.file); // Kiểm tra file đã được upload chưa

//     // Kiểm tra xem có đủ dữ liệu để tạo sản phẩm không
//     if (!name || !categoryId || !color || !size || !price || !quantity || !description || !req.file || !brand || !storeId) {
//       return res.status(400).json({ msgNo: 'All fields are required', Data: null });
//     }

//     // Xử lý upload ảnh
//     let imageUrl = '';

//     // Nếu ảnh là URL
//     if (image && image.startsWith('http')) {
//       imageUrl = image;
//     }
//     // Nếu ảnh là base64
//     else if (image && image.startsWith('data:image')) {
//       console.log('Base64 image detected');
//       const result = await cloudinary.uploader.upload(image, {
//         folder: 'product_images',
//         use_filename: true,
//         unique_filename: false,
//       });
//       imageUrl = result.secure_url;
//     }
//     // Nếu ảnh là file (local)
//     else if (req.file) {
//       console.log('File upload detected');
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'product_images',
//         use_filename: true,
//         unique_filename: false,
//       });
//       imageUrl = result.secure_url;
//     }

//     // Tạo mới sản phẩm
//     const newProduct = new Product({
//       name,
//       categoryId,
//       color,
//       size,
//       price,
//       quantity,
//       description,
//       image: imageUrl, // Gán URL ảnh từ Cloudinary vào
//       brand,
//       storeId,
//     });

//     // Lưu sản phẩm mới vào database
//     await newProduct.save();

//     // Trả về thông tin sản phẩm đã tạo
//     res.status(201).json({ msgNo: 'Product created successfully', Data: newProduct });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msgNo: error.message, Data: null });
//   }
// };


// exports.createProduct = async (req, res) => {
//   try {
//     const { name, categoryId, color, size, price, quantity, description, image, brand, storeId } = req.body;
//     console.log('>>>> Request Body:', req.body);
//     console.log('>>>> File:', req.file); // Kiểm tra file đã được upload chưa

//     // Kiểm tra xem có đủ dữ liệu để tạo sản phẩm không
//     if (!name || !categoryId || !color || !size || !price || !quantity || !description || !brand || !storeId) {
//       return res.status(400).json({ msgNo: 'All fields are required', Data: null });
//     }

//     let imageUrl = '';

//     // Kiểm tra nếu ảnh là URL
//     if (image && image.startsWith('http')) {
//       imageUrl = image;
//     }
//     // Nếu ảnh là base64
//     else if (image && image.startsWith('data:image')) {
//       console.log('Base64 image detected');
//       try {
//         // Upload ảnh base64 lên Cloudinary
//         const result = await cloudinary.uploader.upload(image, {
//           folder: 'product_images',
//           use_filename: true,
//           unique_filename: false,
//         });
//         imageUrl = result.secure_url;
//         console.log('Image uploaded to Cloudinary:', imageUrl); // Added log for successful upload
//       } catch (error) {
//         console.error("Error uploading base64 image to Cloudinary:", error);
//         return res.status(500).json({ msgNo: 'Error uploading image', Data: null });
//       }
//     }
//     // Nếu ảnh là file (multipart)
//     else if (req.file) {
//       console.log('Multipart file upload detected');
//       try {
//         // Upload file lên Cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path, {
//           folder: 'product_images',
//           use_filename: true,
//           unique_filename: false,
//         });
//         imageUrl = result.secure_url;
//         console.log('File uploaded to Cloudinary:', imageUrl); // Added log for successful upload
//       } catch (error) {
//         console.error("Error uploading file to Cloudinary:", error);
//         return res.status(500).json({ msgNo: 'Error uploading file', Data: null });
//       }
//     }

//     // Tạo mới sản phẩm
//     const newProduct = new Product({
//       name,
//       categoryId,
//       color,
//       size,
//       price,
//       quantity,
//       description,
//       image: imageUrl, // Gán URL ảnh từ Cloudinary vào
//       brand,
//       storeId,
//     });

//     // Lưu sản phẩm mới vào database
//     await newProduct.save();
//     console.log('Product saved to database:', newProduct); // Added log for successful save

//     // Trả về thông tin sản phẩm đã tạo
//     res.status(201).json({ msgNo: 'Product created successfully', Data: newProduct });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msgNo: error.message, Data: null });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
    const { name, categoryId, color, size, price, quantity, description, brand, storeId } = req.body;
    console.log('>>>> Request Body:', req.body);
    console.log('>>>> File:', req.file); // Kiểm tra file đã được upload chưa

    // Kiểm tra xem có đủ dữ liệu để tạo sản phẩm không
    if (!name || !categoryId || !color || !size || !price || !quantity || !description || !brand || !storeId) {
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
    console.log('Product saved to database:', newProduct); // Added log for successful save

    // Trả về thông tin sản phẩm đã tạo
    res.status(201).json({ msgNo: 'Product created successfully', Data: newProduct });
  } catch (error) {
    console.error('Error in createProduct:', error);
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
// exports.updateProduct = async (req, res) => {
//   try {
//     const { name, categoryId, color, size, price, quantity, description, image, brand, storeId } = req.body;
//     const updatedProduct = await Product.findById(req.params.id);
//     console.log('>>>> Request Body:', req.body);
//     if (!updatedProduct) {
//       return res.status(constants.NOT_FOUND).json({ msgNo: 'Product not found', Data: null });
//     }

//     // Lưu trữ ảnh cũ nếu không có ảnh mới
//     let imageUrl = updatedProduct.image;

//     // Nếu có ảnh mới và ảnh là URL
//     if (image && image.startsWith('http')) {
//       imageUrl = image;
//     }
//     // Nếu ảnh là base64
//     else if (image && image.startsWith('data:image')) {
//       console.log('Base64 image detected');
//       const result = await cloudinary.uploader.upload(image, {
//         folder: 'product_images',
//         use_filename: true,
//         unique_filename: false,
//       });
//       imageUrl = result.secure_url;
//     }
//     // Nếu ảnh là file (local)
//     else if (req.file) {
//       console.log('File upload detected');
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'product_images',
//         use_filename: true,
//         unique_filename: false,
//       });
//       imageUrl = result.secure_url;
//     }

//     // Cập nhật sản phẩm với thông tin mới
//     updatedProduct.name = name || updatedProduct.name;
//     updatedProduct.categoryId = categoryId || updatedProduct.categoryId;
//     updatedProduct.color = color || updatedProduct.color;
//     updatedProduct.size = size || updatedProduct.size;
//     updatedProduct.price = price || updatedProduct.price;
//     updatedProduct.quantity = quantity || updatedProduct.quantity;
//     updatedProduct.description = description || updatedProduct.description;
//     updatedProduct.image = imageUrl; // Cập nhật URL ảnh
//     updatedProduct.brand = brand || updatedProduct.brand;
//     updatedProduct.storeId = storeId || updatedProduct.storeId;

//     await updatedProduct.save();
//     res.status(200).json({ msgNo: "update product successful", Data: updatedProduct });

//   } catch (error) {
//     console.error(error);
//     res.status(constants.VALIDATION_ERROR).json({ msgNo: error.message, Data: null });
//   }
// };
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, color, size, price, quantity, description, brand, storeId } = req.body
    // Check if all required fields are provided
    if (!name || !categoryId || !color || !size || !price || !quantity || !description || !brand || !storeId) {
      console.log('Missing required fields');
      return res.status(400).json({ msgNo: 'All fields are required', Data: null });
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
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        categoryId,
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
    );
    console.log('3');

    console.log('Product updated in database:', updatedProduct); // Log successful update
    // Return the updated product information
    // res.status(200).json({ msgNo: 'Product updated successfully', Data: updatedProduct });
    res.status(200).json({ msgNo: 'Product created successfully', Data: updatedProduct });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ msgNo: error.message, Data: null });
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
