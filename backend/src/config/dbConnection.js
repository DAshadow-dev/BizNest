
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const dbConnecion = async () =>{
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB: ${db.connection.host}`);
    } catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

module.exports = dbConnecion;
