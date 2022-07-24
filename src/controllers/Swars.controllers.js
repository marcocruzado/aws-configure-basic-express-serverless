
const Jedi = require('../models/jedi')


const CtrlWellcome = (req,res)=>{
    res.json({
        message:'Welcome to Swars API'
    })
}
const CtrlGetSwars = async(req,res)=>{
    const allJedi = await Jedi.find()
    return res.json(allJedi)
}
const CtrlPostSwars = async(req,res)=>{
    const newJedi = new Jedi({
        name:req.body.name,
        side:req.body.side
    })
    await newJedi.save()
    return res.json({
        message:'Jedi saved successfully'
    })
}



module.exports = {
    CtrlGetSwars,
    CtrlWellcome,
    CtrlPostSwars
}