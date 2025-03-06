const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/routes/auth/authRoute");
const userRoute = require('./src/routes/userRoute');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const storeRoutes = require('./src/routes/storeRoutes');
const staffRoutes = require('./src/routes/staffRoutes');
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
