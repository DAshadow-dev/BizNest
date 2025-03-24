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

//connect to DB
connectToDB();

//from router
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
//from errorHandle
app.use(errorHandler);

//auth router
app.use("/api/auth", authRoute);
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

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
