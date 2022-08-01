require('dotenv').config();
const express = require('express')

const app = express()
const path = require('path');

const port = process.env.PORT;

const app_path = path.join(__dirname,'app')
const module_path = path.join(app_path,'modules');
const helper_path = path.join(app_path,'helper');
const router_file = path.join(module_path,'router.js');

global.db_helper = require(path.join(helper_path,'db.js'));

//parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

//routes
var router = require(router_file);
app.use('/',router);

app.listen(port,() => {
    console.log(`app is running at port ${port}`);
})