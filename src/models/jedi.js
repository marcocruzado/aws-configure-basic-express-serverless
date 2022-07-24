const {model,Schema}=require('mongoose')

const jediSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    side:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = model('Jedi',jediSchema)