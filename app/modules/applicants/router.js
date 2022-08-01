const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.url_path = '/applicant';

router.post('/create', async (req, res) => {
    let result = await controller.create(req.body)
    res.json(result)
})

router.post('/read', async (req, res) =>{
    let result = await controller.read(req.body)
    res.json(result);
})

router.post('/update', async (req, res) =>{
    let result = await controller.update(req.body)
    res.json(result);
})

router.post('/delete', async (req, res) =>{
    let result = await controller.delete(req.body)
    res.json(result);
})

module.exports = router