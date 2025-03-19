const Chat = require("../models/Chat");
const { Server } = require("socket.io");

// Hàm gửi tin nhắn
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();

    const io = req.app.get("socketio");
    if (global.users[receiverId]) {
      io.to(global.users[receiverId]).emit("receiveMessage", chat);
    }

    res.status(201).json({Data : chat});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm lấy tin nhắn giữa hai người dùng
exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Missing senderId or receiverId" });
    }

    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    console.log("senderId: ", senderId);
    console.log("receiverId: ", receiverId);
    console.log("messages: ", messages);
    res.json({Data : { messages }});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm đánh dấu tin nhắn là "đã đọc"
exports.markAsRead = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    await Chat.updateMany(
      { senderId, receiverId, status: "unread" },
      { $set: { status: "read" } }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
