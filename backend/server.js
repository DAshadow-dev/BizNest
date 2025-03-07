const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/routes/auth/authRoute");
const userRoute = require('./src/routes/userRoute');
const adminRoute = require('./src/routes/admin/adminRouter');


const port = process.env.PORT || 5000;

//connect to DB
connectToDB();

//from router
app.use(express.json());

//from cors
app.use(cors());


//auth router
app.use("/api/auth", authRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);


//from errorHandle
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
