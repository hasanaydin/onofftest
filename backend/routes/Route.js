const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require("../controller/Shop")

router.use(accountRoutes)
module.exports = router;