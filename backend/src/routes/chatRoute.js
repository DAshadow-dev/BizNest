const express = require("express");
const { sendMessage, getMessages, markAsRead } = require("../controllers/chatController");
const Chat = require("../models/Chat");
const User = require("../models/User");

const chatRouter = express.Router();

chatRouter.post("/send", sendMessage);
chatRouter.get("/messages", getMessages);
chatRouter.post("/mark-as-read", markAsRead);
chatRouter.get("/chat-list/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      // Lấy danh sách receiverId mà userId đã chat
      const receivers = await Chat.find({ senderId: userId }).distinct("receiverId");
      // Lấy thông tin user và tin nhắn cuối cùng
      const chatList = await Promise.all(
        receivers.map(async (receiverId) => {
          // Lấy thông tin user (username, image)
          const user = await User.findById(receiverId).select("username image");
  
          // Lấy tin nhắn cuối cùng giữa userId và receiverId
          const lastMessage = await Chat.findOne({
            $or: [
              { senderId: userId, receiverId },
              { senderId: receiverId, receiverId: userId },
            ],
          })
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian giảm dần
            .limit(1);
  
          return {
            receiverId,
            name: user?.username || "Unknown",
            avatar: user?.image || "https://i.pravatar.cc/150?img=10", 
            lastMessage: lastMessage?.message || "Chưa có tin nhắn",
            lastMessageTime: lastMessage?.createdAt || null,
          };
        })
      );
  
      res.status(200).json({ success: true, Data: { chatList } });
    } catch (error) {
      res.status(500).json({ success: false, MsgNo: error.message });
    }
  });

module.exports = chatRouter;