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
routes.get('/', (req, res) => {
  res.send({ success: true, msg: 'express is working' })
});

routes.get('/getShopItems', (req, res) => {
  res.send(getItems(shopDataPath));
});

routes.get('/getCartItems', (req, res) => {
  res.send(getItems(cartDataPath));
});


routes.post('/setCartItem', (req, res) => {
  const shopItemId = req.body.shopItemId ? req.body.shopItemId.trim() : '';
  const productName = req.body.productName ? req.body.productName.trim() : '';

  if (shopItemId === undefined || shopItemId === '' || productName === undefined || productName === '') {
    return res.send({ success: false, msg: 'Data not valid' });
  }

  let existItems = getItems(cartDataPath)
  existItems.push({ "id":createUniqId(), shopItemId, productName });

  setItemsToCart(existItems);
  res.send({ success: true, msg: 'Cart item added successfully' })
})

routes.delete('/delCartItem/', (req, res) => {


  const id = req.body.id ? req.body.id.trim() : '';
  if (id === undefined || id === '') {
    return res.send({ success: false, msg: 'Data not valid' });
  }
  var existItems = getItems(cartDataPath)

  delete existItems[id];
  setItemsToCart(existItems);
  res.send({ success: true, msg: 'Cart item deleted successfully' })

})
module.exports = routes
