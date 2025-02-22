const express= require('express');
const dotenv= require('dotenv').config();
const app= express();
const errorHandler= require('./src/middlewares/errorHandler');
const connectToDB = require('./src/config/dbConnection');

const port= process.env.PORT || 5000;


//connect to DB
connectToDB();

//from router
app.use(express.json())

app.use('/api/users', require('./src/routes/userRoute'))

//from errorHandle
app.use(errorHandler);

app.listen(port, () =>{
    console.log('Server running on port: ', port);
})

