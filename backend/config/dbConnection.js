const mongoose = require('mongoose');

// Connect to MongoDB
const dbConnecion = async () =>{
    try{
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/BizNest", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB: ${db.connection.host}`);
    } catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        res.status(500).send('Error connecting to the database');
    }
}

module.exports = dbConnecion;