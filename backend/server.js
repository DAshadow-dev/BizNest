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

//app.use('/api/quizzes', require('./src/routes/quizzRoute'))


//from views
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
//app.use('/page', require('./src/routes_page/pageRoute'))

//from errorHandle
app.use(errorHandler);

app.listen(port, () =>{
    console.log('Server running on port: ', port);
})

