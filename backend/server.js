const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/routes/auth/authRoute");
const { Server } = require("socket.io");
const chatRoute = require("./src/routes/chatRoute");
const userRoute = require('./src/routes/userRoute');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

//connect to DB
connectToDB();

//from router
app.use(express.json());

//from cors
app.use(cors());
//from errorHandle
app.use(errorHandler);

//auth router
app.use("/api/auth", authRoute);
//chat router
app.use("api/chat", chatRoute);
//connect socket.io
io.on("connection", (socket) => {
  console.log("User connected : " + socket.id);
  //send message event
  io.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg);
  });
  //disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected : " + socket.id);
  });
});
app.use('/api/user', userRoute)



app.listen(port, () => {
  console.log("Server running on port: ", port);
});
