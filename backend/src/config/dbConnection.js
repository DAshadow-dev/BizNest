
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const dbConnecion = async () =>{
    console.log(process.env.MONGODB_ATLAS)
    try{
        const db = await mongoose.connect(process.env.MONGODB_ATLAS, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB: ${db.connection.host}`);
    } catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

module.exports = dbConnecion;
