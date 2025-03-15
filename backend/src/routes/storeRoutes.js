const express = require('express');
const StoreController = require('../controllers/storeController');
const router = express.Router();

router.post('/stores', StoreController.createStore);
router.get('/stores', StoreController.getAllStores);

module.exports = router;
