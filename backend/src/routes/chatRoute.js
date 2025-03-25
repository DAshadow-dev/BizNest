const express = require("express");
const { sendMessage, getMessages, markAsRead } = require("../controllers/chatController");

const router = express.Router();

router.post("/send", sendMessage);
router.get("/messages", getMessages);
router.post("/mark-as-read", markAsRead);

module.exports = router;