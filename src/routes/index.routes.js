const express = require('express')
const router = express.Router({ mergeParams: true })
const{
    CtrlGetSwars,
    CtrlWellcome,
    CtrlPostSwars,
}=require('../controllers/Swars.controllers')


router.get('/',CtrlWellcome)
router.get('/list',CtrlGetSwars)
router.post('/add',CtrlPostSwars)




module.exports = {
    router,
};