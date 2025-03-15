const express= require('express');
const router=  express.Router();

const userController= require('../controllers/user/userController');
const validateToken = require('../middlewares/validateTokenHandler');
const  {changePasswordByUser, updateInformationByUser} = userController;

router.put('/changePassword', validateToken, changePasswordByUser)
router.put('/updateInformation', validateToken, updateInformationByUser)

module.exports= router;