const express= require('express');
const router=  express.Router();


const userController= require('../controllers/user/userController');
const validateToken = require('../middlewares/validateTokenHandler');
const checkAdmin = require('../middlewares/checkAdmin');
const  {changePasswordByUser, updateInformationByUser,getBusinessOwners,toggleAccountStatus} = userController;

router.post('/changePassword', validateToken, changePasswordByUser);
router.post('/updateInformation', validateToken, updateInformationByUser);

router.get('/businessOwners',getBusinessOwners);
router.put('/toggleStatus/:id',toggleAccountStatus);

module.exports= router;