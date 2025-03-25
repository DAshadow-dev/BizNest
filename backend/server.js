const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/routes/auth/authRoute");
const chatRoute = require("./src/routes/chatRoute");
const userRoute = require("./src/routes/userRoute");
const Chat = require("./src/models/Chat");
const { Server } = require("socket.io");
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const storeRoutes = require('./src/routes/storeRoutes');
const staffRoutes = require('./src/routes/staffRoutes');
const customerRoute = require('./src/routes/customerRoute');
const adminRoute = require('./src/routes/admin/adminRouter');
const invoiceRouter = require('./src/routes/invoiceRouter');
const transactionRouter = require('./src/routes/transaction/transactionRoutes');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Kết nối DB
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', categoryRoutes);
app.use('/api', storeRoutes);
app.use('/api', productRoutes);
app.use('/api', staffRoutes);
//from errorHandle
app.use(errorHandler);
//from cors
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
// Khởi tạo danh sách người dùng kết nối với socket
global.users = {};

// Kết nối Socket.IO
=======
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
//chat router
app.use("api/chat", chatRoute);
//user router
app.use('/api/user', userRoute)
//customer router
app.use('/api/customer', customerRoute)
//invoice
app.use('/api/invoice', invoiceRouter);

//transaction
app.use('/api/transaction', transactionRouter);

//connect socket.io
io.on("connection", (socket) => {
  console.log("🔵 New client connected:", socket.id);

  // Lưu user vào danh sách khi họ kết nối
  socket.on("userOnline", (userId) => {
    global.users[userId] = socket.id;
    console.log(`🟢 User ${userId} is online`);
  });

  // Xử lý tin nhắn mới
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      const chat = new Chat({ senderId, receiverId, message });
      await chat.save();

      // Gửi tin nhắn ngay đến người nhận nếu họ online
      if (global.users[receiverId]) {
        io.to(global.users[receiverId]).emit("receiveMessage", chat);
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });

  // Xóa user khỏi danh sách khi họ rời đi
  socket.on("disconnect", () => {
    Object.keys(global.users).forEach((key) => {
      if (global.users[key] === socket.id) {
        delete global.users[key];
        console.log(`🔴 User ${key} disconnected`);
      }
    });
  });
});
// Đưa `io` vào `app` để sử dụng trong `chatController.js`
app.set("socketio", io);


server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
