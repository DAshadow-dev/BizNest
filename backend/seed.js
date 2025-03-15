const mongoose = require('mongoose');
const dbConnecion = require('./src/config/dbConnection');
const bcrypt = require("bcryptjs");
const User = require('./src/models/User');
const Customer = require('./src/models/Customer');
const Store = require('./src/models/Store');

const seedData = async () => {
    await dbConnecion();

    //create Data User
    await User.create({
        username: "Pending 1",
        password: await bcrypt.hash('12345678', 10),
        verified: true,
        email: "bus5@gmail.com",
        phone: "123",
        gender: true,
        date_of_birth: new Date("2000-01-01"),
        storeId: 1
    });

    //create Data User
    await User.create({
        username: "Pending 2",
        password: await bcrypt.hash('12345678', 10),
        verified: true,
        email: "bus6@gmail.com",
        phone: "123",
        gender: true,
        date_of_birth: new Date("2000-01-01"),
        storeId: 1
    });

    // //create Data Customer
    // await Customer.create({
    //     fullname: "Hoang Nguyen",
    //     email: "cus1@email.com",
    //     phone: "0905123456",
    //     gender: true,
    //     date_of_birth: new Date("2000-01-01")
    // });

    // await Customer.create({
    //     fullname: "Thien Duyen",
    //     email: "duyen1@email.com",
    //     phone: "0934903291",
    //     gender: false,
    //     date_of_birth: new Date("2000-01-10")
    // });

    // await Customer.create({
    //     fullname: "Hoang Cuong",
    //     email: "cuong1@email.com",
    //     phone: "0905123789",
    //     gender: true,
    //     date_of_birth: new Date("2003-06-01")
    // });

    // await Customer.create({
    //     fullname: "Duy An",
    //     email: "duyan1@email.com",
    //     phone: "0905123213",
    //     gender: true,
    //     date_of_birth: new Date("2000-11-02")
    // });
    
    // //create store

    // await Store.create({
    //     owner: 1,
    //     name: "Fashion Men Shop",
    //     address: "650 Le Duan, Thanh Khe, Da Nang",
    //     phone: "0934726073",
    //     customers: [1,2,3,4]
    // })
    
    mongoose.connection.close();
};

seedData();