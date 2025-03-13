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

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Kết nối DB
connectToDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/user", userRoute);

// Khởi tạo danh sách người dùng kết nối với socket
global.users = {};

// Kết nối Socket.IO
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
