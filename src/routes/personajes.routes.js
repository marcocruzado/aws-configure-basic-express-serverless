const express = require('express')
const router = express.Router({ mergeParams: true })

const{
    CtrlGetPersonajes,
    CtrlGetPersonaje
}=require('../controllers/Personajes.controllers')


router.get('/',CtrlGetPersonajes)
router.get('/:id',CtrlGetPersonaje)




module.exports = {
    router,
};