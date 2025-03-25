const mongoose = require('mongoose');
const dbConnecion = require('./src/config/dbConnection');
const bcrypt = require("bcryptjs");
const User = require('./src/models/User');
const Customer = require('./src/models/Customer');
const Store = require('./src/models/Store');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const Role = require('./src/models/Role');
const Invoice = require('./src/models/Invoice');

/**
 * Hàm reset sequence counter
 */
const resetCounter = async (counterName, startValue) => {
  try {
    console.log(`Setting ${counterName} counter to ${startValue}...`);
    
    // Reset counter
    const Counter = mongoose.connection.db.collection('counters');
    await Counter.updateOne(
      { _id: counterName },
      { $set: { seq: startValue } },
      { upsert: true }
    );
    console.log(`${counterName} counter set successfully!`);
  } catch (error) {
    console.error(`Error setting ${counterName} counter:`, error);
  }
};

/**
 * Hàm chính để tạo dữ liệu mẫu
 */
const seedData = async () => {
  try {
    await dbConnecion();
    console.log("Connected to the database!");
    
    // Xóa tất cả dữ liệu hiện có (vì đây là database mới)
    console.log("Removing all existing data...");
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Store.deleteMany({});
    await Customer.deleteMany({});
    await User.deleteMany({});
    // await Role.deleteMany({});
    
    // Xóa tất cả counter cũ
    const Counter = mongoose.connection.db.collection('counters');
    await Counter.deleteMany({});
    
    console.log("All existing data has been removed successfully!");

    // === INITIALIZE COUNTERS ===
    // await resetCounter('role_seq', 1);
    await resetCounter('user_seq', 1);
    await resetCounter('store_seq', 1);
    await resetCounter('customer_seq', 1);
    await resetCounter('category_seq', 1);
    await resetCounter('product_seq', 100);

    // === CREATE CATEGORIES (THỜI TRANG) ===
    console.log("\nCreating fashion categories...");
    const categories = [
      { name: "Áo", description: "Các loại áo thời trang" },
      { name: "Quần", description: "Các loại quần thời trang" },
      { name: "Giày & Dép", description: "Giày, dép và các loại giày thể thao" },
      { name: "Phụ kiện", description: "Túi xách, thắt lưng, trang sức và các phụ kiện thời trang" },
      { name: "Đồ thể thao", description: "Các loại đồ dùng cho tập luyện và thể thao" },
      { name: "Đồ mùa đông", description: "Áo khoác, áo len và các trang phục mùa đông" }
    ];
    
    const createdCategories = [];
    for (const category of categories) {
      const newCategory = await Category.create(category);
      createdCategories.push(newCategory);
      console.log(`Category "${category.name}" created with ID: ${newCategory._id}`);
    }
    console.log("Fashion categories created successfully!");

    // === CREATE USERS ===
    console.log("\nCreating users...");
    
    // Admin user
    const adminUser = await User.create({
      username: "admin",
      password: await bcrypt.hash('12345678', 10),
      verified: true,
      email: "a1@email.com",
      phone: "0900000000",
      role: "admin",
      status: "active",
      pendingApproval: false
    });
    console.log(`Admin user created with ID: ${adminUser._id}`);

    // Business owner users (Fashion Stores)
    const businessOwners = [
      {
        username: "fashion_owner",
        password: await bcrypt.hash('12345678', 10),
        verified: true,
        email: "b1@email.com",
        phone: "0934726073",
        role: "business owner",
        status: "active",
        pendingApproval: false
      },
      {
        username: "sport_owner",
        password: await bcrypt.hash('12345678', 10),
        verified: true,
        email: "b2@email.com",
        phone: "0902222222",
        role: "business owner",
        status: "active",
        pendingApproval: false
      },
      {
        username: "Women King Clothes Shop",
        password: await bcrypt.hash('12345678', 10),
        verified: true,
        email: "b3@emai.com",
        phone: "0903333333",
        role: "business owner",
        gender: true,
        status: "pending",
        pendingApproval: true,
        date_of_birth: new Date("2000-01-01")
      },
      {
        username: "1998 Shoes Shop",
        password: await bcrypt.hash('12345678', 10),
        verified: true,
        email: "b4@emai.com",
        phone: "0904444444",
        role: "business owner",
        gender: true,
        status: "pending",
        pendingApproval: true,
        date_of_birth: new Date("2000-01-01")
      }
    ];

    const createdOwners = [];
    for (const owner of businessOwners) {
      const newOwner = await User.create(owner);
      createdOwners.push(newOwner);
      console.log(`Business owner ${owner.username} created with ID: ${newOwner._id}`);
    }

    // Staff users
    const staffUsers = [
      {
        username: "fashion_staff",
        password: await bcrypt.hash('Staff@123', 10),
        verified: true,
        email: "fashion_staff@biznest.com",
        phone: "0905555555",
        role: "staff",
        status: "active",
        pendingApproval: false
      },
      {
        username: "sport_staff",
        password: await bcrypt.hash('Staff@123', 10),
        verified: true,
        email: "sport_staff@biznest.com",
        phone: "0906666666",
        role: "staff",
        status: "active",
        pendingApproval: false
      },
      // Additional sport store staff
      {
        username: "Nguyen Van Tuan",
        password: await bcrypt.hash('Staff@123', 10),
        verified: true,
        email: "tuan.nguyen@biznest.com",
        phone: "0907777777",
        role: "staff",
        status: "active",
        pendingApproval: false
      },
      {
        username: "Tran Thi Mai",
        password: await bcrypt.hash('Staff@123', 10),
        verified: true,
        email: "mai.tran@biznest.com",
        phone: "0908888888",
        role: "staff",
        status: "active",
        pendingApproval: false
      },
      {
        username: "Le Van Hung",
        password: await bcrypt.hash('Staff@123', 10),
        verified: true,
        email: "hung.le@biznest.com",
        phone: "0909999999",
        role: "staff",
        status: "inactive",
        pendingApproval: false
      }
    ];

    const createdStaff = [];
    for (const staff of staffUsers) {
      const newStaff = await User.create(staff);
      createdStaff.push(newStaff);
      console.log(`Staff user ${staff.username} created with ID: ${newStaff._id}`);
    }
    console.log("Users created successfully!");

    // === CREATE STORES (FASHION STORES) ===
    console.log("\nCreating fashion stores...");
    
    const fashionOwner = createdOwners.find(owner => owner.username === "fashion_owner");
    const sportOwner = createdOwners.find(owner => owner.username === "sport_owner");

    // Các cửa hàng thời trang
    const fashionStore = await Store.create({
      owner: fashionOwner._id,
      name: "Fashion Trends Shop",
      address: "650 Le Duan, Thanh Khe, Da Nang",
      phone: "0934726073",
      customers: []
    });
    
    // Cập nhật storeId cho owner
    await User.findByIdAndUpdate(fashionOwner._id, { storeId: fashionStore._id });
    console.log(`Store "${fashionStore.name}" created with ID: ${fashionStore._id} and linked to owner ${fashionOwner.username}`);

    const sportStore = await Store.create({
      owner: sportOwner._id,
      name: "Sport Style Center",
      address: "123 Nguyen Van Linh, Hai Chau, Da Nang",
      phone: "0987654321",
      customers: []
    });
    
    // Cập nhật storeId cho owner
    await User.findByIdAndUpdate(sportOwner._id, { storeId: sportStore._id });
    console.log(`Store "${sportStore.name}" created with ID: ${sportStore._id} and linked to owner ${sportOwner.username}`);
    
    console.log("Fashion stores created successfully!");

    // After stores are created, update staff with storeId
    console.log("\nAssigning staff to stores...");
    
    // Assign fashion staff to fashion store
    const fashionStaffUser = createdStaff.find(staff => staff.username === "fashion_staff");
    if (fashionStaffUser) {
      await User.findByIdAndUpdate(fashionStaffUser._id, { storeId: fashionStore._id });
      console.log(`Assigned staff ${fashionStaffUser.username} to store ${fashionStore.name} (ID: ${fashionStore._id})`);
    }
    
    // Assign all other staff to sport store (storeId 2)
    const sportStoreStaff = createdStaff.filter(staff => staff.username !== "fashion_staff");
    for (const staff of sportStoreStaff) {
      await User.findByIdAndUpdate(staff._id, { storeId: sportStore._id });
      console.log(`Assigned staff ${staff.username} to store ${sportStore.name} (ID: ${sportStore._id})`);
    }
    
    // === CREATE CUSTOMERS ===
    console.log("\nCreating customers...");
    const customers = [
      {
        fullname: "Hoang Nguyen",
        email: "cus1@email.com",
        phone: "0905123456",
        gender: true,
        date_of_birth: new Date("2000-01-01")
      },
      {
        fullname: "Thien Duyen",
        email: "duyen1@email.com",
        phone: "0934903291",
        gender: false,
        date_of_birth: new Date("2000-01-10")
      },
      {
        fullname: "Hoang Cuong",
        email: "cuong1@email.com",
        phone: "0905123789",
        gender: true,
        date_of_birth: new Date("2003-06-01")
      },
      {
        fullname: "Duy An",
        email: "duyan1@email.com",
        phone: "0905123213",
        gender: true,
        date_of_birth: new Date("2000-11-02")
      }
    ];

    const createdCustomers = [];
    for (const customer of customers) {
      const newCustomer = await Customer.create(customer);
      createdCustomers.push(newCustomer);
      console.log(`Customer ${customer.fullname} created with ID: ${newCustomer._id}`);
    }

    // Thêm khách hàng vào cửa hàng
    const customerIds = createdCustomers.map(customer => customer._id);
    
    // Thêm khách hàng vào cả 2 cửa hàng
    fashionStore.customers = customerIds;
    await fashionStore.save();
    console.log(`Added ${customerIds.length} customers to store ${fashionStore.name}`);
    
    sportStore.customers = customerIds.slice(0, 2); // Chỉ thêm 2 khách hàng đầu tiên vào cửa hàng thể thao
    await sportStore.save();
    console.log(`Added ${sportStore.customers.length} customers to store ${sportStore.name}`);

    console.log("Customers created successfully!");

    // === CREATE PRODUCTS (FASHION PRODUCTS) ===
    console.log("\nCreating fashion products...");

    // Lấy các danh mục
    const aoCategory = createdCategories.find(c => c.name === "Áo");
    const quanCategory = createdCategories.find(c => c.name === "Quần");
    const giayCategory = createdCategories.find(c => c.name === "Giày & Dép");
    const pkCategory = createdCategories.find(c => c.name === "Phụ kiện");
    const thethaoCategory = createdCategories.find(c => c.name === "Đồ thể thao");
    const dongCategory = createdCategories.find(c => c.name === "Đồ mùa đông");

    // Sản phẩm thời trang thông thường
    const fashionProducts = [
      {
        name: "Áo sơ mi nam dài tay",
        categoryId: aoCategory._id,
        color: "Trắng",
        size: "L",
        price: 350000,
        quantity: 50,
        description: "Áo sơ mi nam dài tay chất liệu cotton cao cấp, thoáng mát, thiết kế hiện đại phù hợp cho công sở và các buổi gặp mặt quan trọng",
        image: "https://product.hstatic.net/200000588671/product/dsc07927_39e824282073414092b7a9c98fac9b41.jpg",
        brand: "Local Brand",
        storeId: fashionStore._id
      },
      {
        name: "Áo thun nam cổ tròn",
        categoryId: aoCategory._id,
        color: "Đen",
        size: "M",
        price: 199000,
        quantity: 100,
        description: "Áo thun nam cổ tròn basic, chất liệu cotton 100%, form rộng thoải mái, phù hợp cho mọi hoạt động hàng ngày",
        image: "https://chodole.com/cdn/shop/products/CDL5_1_1024x1024.jpg?v=1586758906",
        brand: "Việt Fashion",
        storeId: fashionStore._id
      },
      {
        name: "Áo polo nam phối viền",
        categoryId: aoCategory._id,
        color: "Xanh navy",
        size: "XL",
        price: 280000,
        quantity: 75,
        description: "Áo polo nam phối viền cổ và tay áo, chất liệu cá sấu co giãn, thấm hút mồ hôi tốt, lịch sự và sang trọng",
        image: "https://bizweb.dktcdn.net/100/415/697/products/ap001.png?v=1701403328933",
        brand: "Coolmate",
        storeId: fashionStore._id
      }
    ];

    // Tạo các sản phẩm thời trang
    for (const product of fashionProducts) {
      const newProduct = await Product.create(product);
      console.log(`Fashion product "${product.name}" created with ID: ${newProduct._id}`);
    }

    // Sản phẩm thể thao
    const sportProducts = [
      {
        name: "Áo thun thể thao nam",
        categoryId: thethaoCategory._id,
        color: "Xanh dương",
        size: "M",
        price: 250000,
        quantity: 30,
        description: "Áo thun thể thao nam chất liệu polyester cao cấp, thấm hút mồ hôi tốt, thoáng khí, co giãn 4 chiều",
        image: "https://bizweb.dktcdn.net/100/415/697/products/ap001.png?v=1701403328933",
        brand: "Adidas",
        storeId: sportStore._id
      },
      {
        name: "Quần jogger thể thao",
        categoryId: thethaoCategory._id,
        color: "Xám",
        size: "L",
        price: 320000,
        quantity: 25,
        description: "Quần jogger thể thao chất liệu thun nỉ, co giãn tốt, thiết kế gọn gàng thoải mái, phù hợp cho tập gym và các hoạt động ngoài trời",
        image: "https://chodole.com/cdn/shop/products/CDL5_1_1024x1024.jpg?v=1586758906",
        brand: "Nike",
        storeId: sportStore._id
      }
    ];

    // Tạo các sản phẩm thể thao
    for (const product of sportProducts) {
      const newProduct = await Product.create(product);
      console.log(`Sport product "${product.name}" created with ID: ${newProduct._id}`);
    }

    console.log("Products created successfully!");

    console.log("\n=== SEED DATA COMPLETED SUCCESSFULLY ===");
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error during seed process:", error);
    mongoose.connection.close();
  }
};

// Thực thi seed data
seedData();