const express= require('express');
const router=  express.Router();

const userController= require('../controllers/userController');
const  {getUsers, getUserById, updateInformationUserById, changePasswordUserById} = userController;

router.route('/').get(getxUsers);


module.exports= router;