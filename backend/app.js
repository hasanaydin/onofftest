const cors = require('cors');
const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');

const app = express();
app.use(cors());
const port = 3001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes/Route.js')
app.use('/', routes)


app.listen(port, ()=>{
    console.log(`Express listening port: ${port}`)
}) 