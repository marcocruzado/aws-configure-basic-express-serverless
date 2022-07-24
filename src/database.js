const mongoose = require('mongoose')
const {DATABASE}=require('./config/variables')


const Url = `mongodb+srv://${DATABASE.USER}:${DATABASE.PASSWORD}@${DATABASE.HOST}/${DATABASE.DATABASE}?retryWrites=true&w=majority` 

mongoose.connect(Url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('>>>>>Database is connected<<<<<<')
}).catch(err=>{
    console.log(err)
})