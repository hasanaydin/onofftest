const express = require("express")
const routes = express.Router();
const fs = require('fs');
const { v1: createUniqId } = require('uuid');

const shopDataPath = './data/shop.json'
const cartDataPath = './data/cart.json'

const getItems = (dataPath) => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data)
}
const setItemsToCart = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(cartDataPath, stringifyData)
}
const getShopItems = ((req, res) => {
  res.send(getItems(shopDataPath));
})

const getCartItems = ((req, res) => {
  res.send(getItems(cartDataPath));
});

const setCartItem = ((req, res) => {
  const shopItemId = req.body.shopItemId ? req.body.shopItemId.trim() : '';
  const productName = req.body.productName ? req.body.productName.trim() : '';

  if (shopItemId === undefined || shopItemId === '' || productName === undefined || productName === '') {
    return res.send({ success: false, msg: 'Data not valid' });
  }

  let existItems = getItems(cartDataPath)
  existItems.push({ "id": createUniqId(), shopItemId, productName });

  setItemsToCart(existItems);
  res.send(getItems(cartDataPath));
})
const delCartItem = ((req, res) => {
  const id = req.body.id ? req.body.id.trim() : '';
  if (id === undefined || id === '') {
    return res.send({ success: false, msg: 'Data not valid' });
  }

  var existItems = getItems(cartDataPath)

  const indexOfObject = existItems.findIndex(object => {
    return object.id === id;
  });
  
  indexOfObject!==-1 && existItems.splice(indexOfObject, 1);

  setItemsToCart(existItems);
  res.send(getItems(cartDataPath));

})
module.exports = {
  getShopItems,
  getCartItems,
  setCartItem,
  delCartItem
}