const express= require('express');
const router=  express.Router();


const adminController= require('../../controllers/admin/adminController');
// const checkAdmin = require('../middlewares/checkAdmin');
const  {getBusinessOwners,toggleAccountStatus} = adminController;

router.get('/businessOwners',getBusinessOwners);
router.put('/toggleStatus/:id',toggleAccountStatus);

module.exports= router;