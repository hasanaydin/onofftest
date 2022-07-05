const express = require("express")
const router = express.Router();
const fs = require('fs');
const controller = require("../controller/Shop")

const  { 
    getShopItems,
    getCartItems,
    setCartItem,
    delCartItem
} = require('../controller/Shop')


router.get('/getShopItems', getShopItems)
router.get('/getCartItems', getCartItems)
router.post('/setCartItem', setCartItem) 
router.delete('/delCartItem', delCartItem)

module.exports = router
