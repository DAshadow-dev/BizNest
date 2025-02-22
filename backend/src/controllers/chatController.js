const Chat = require("../models/Chat");

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({createdAt: 1});
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

