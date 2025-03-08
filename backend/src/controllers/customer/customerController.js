const asyncHandler= require('express-async-handler');
const Customer= require('../../models/Customer');
const Store= require('../../models/Store');
const User = require('../../models/User');

const getListCustomerByStoreId= asyncHandler( async (req, res) => {
    try {
        const user= await User.findOne({email: req.email});
        const store= await Store.findById(user.storeId).populate("customers");
        const listCustomer= store.customers;
        res.status(200);
        res.json({Data: listCustomer});
    } catch (err) {
        res.status(500)
        throw new Error(err.message); 
    }
})

const createListCustomer= asyncHandler( async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body);
        const user= await User.findOne({email: req.email});
        const store= await Store.findById(user.storeId)
        store.customers= [...store.customers, newCustomer.id]
        store.save();
        res.status(201).json({Data: newCustomer});
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

const getCustomerById= asyncHandler( async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.status(200).json({Data: customer});
    } catch (err) {
        res.status(500)
        throw new Error(err.message); 
    }
}) 

const deleteCustomerById= asyncHandler( async (req, res) => {
    try {
        const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
        const user= await User.findOne({email: req.email});
        const store= await Store.findById(user.storeId)
        store.customers= store.customers.filter((e,i) => e.id != req.params.id)
        store.save();
        res.status(200).json({Data: deleteCustomer, Message: "Delete Customer Success"});
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

const updateCustomerById= asyncHandler( async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        customer.fullname= req.body.fullname;
        customer.email= req.body.email;
        customer.phone= req.body.phone;
        customer.gender= req.body.gender;
        customer.date_of_birth= req.body.date_of_birth;
        customer.save();
        res.status(200).json({Data: customer});
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})


module.exports= {getListCustomerByStoreId, getCustomerById, createListCustomer, updateCustomerById, deleteCustomerById};