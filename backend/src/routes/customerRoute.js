const express= require('express');
const router=  express.Router();

const customerController= require('../controllers/customer/customerController');
const validateToken = require('../middlewares/validateTokenHandler');
const  {getListCustomerByStoreId, getCustomerById, createListCustomer, updateCustomerById, deleteCustomerById} = customerController;

router.get('/', validateToken, getListCustomerByStoreId)
router.get('/:id', validateToken, getCustomerById)
router.post('/', validateToken, createListCustomer)
router.put('/:id', validateToken, updateCustomerById)
router.delete('/:id', validateToken, deleteCustomerById)

module.exports= router;