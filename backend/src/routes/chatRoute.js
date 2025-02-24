const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');

const app = express();
const chatRoute = express.Router();

chatRoute.post('/send',sendMessage);
chatRoute.get('/messages',getMessages);

module.exports = chatRoute;