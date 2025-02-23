const express= require('express');
const router=  express.Router();

const userController= require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');
const  {changePasswordByUser, updateInformationByUser} = userController;

router.post('/changePassword', validateToken, changePasswordByUser)
router.post('/updateInformation', validateToken, updateInformationByUser)

module.exports= router;