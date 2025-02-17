const express= require('express');
const router=  express.Router();

const userController= require('../controllers/userController');
const  {getUsers} = userController;

router.route('/').get(getUsers);


module.exports= router;