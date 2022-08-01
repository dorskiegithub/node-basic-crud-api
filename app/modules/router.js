const fs = require('fs');
const path = require('path');

var express = require('express')
var router = express.Router()

//for modules
let module_list = fs.readdirSync(__dirname).filter(file => {
    let current_module = path.join(__dirname,file);
    return fs.statSync(current_module).isDirectory();
});

module_list.forEach(mod => {
    let current_module = path.join(__dirname,mod);
    let router_file = path.join(current_module,'router.js');
    if (fs.existsSync(router_file)){
        var current_router = require(router_file);
        if (current_router.url_path != undefined && current_router.url_path != null){
            router.use(current_router.url_path,current_router);
        }
        else{
            router.use('/',current_router);
        }
    }
})

//for invalid pages
router.use((req, res) => {
    res.status(400);
    res.json({
        'msg': 'Invalid request!',
    });
});

module.exports = router;
