const mongoose = require('mongoose')
const Schema =mongoose.Schema


const UserSchema =new Schema({
    pname:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
})

const UserModel =new mongoose.model('user',UserSchema)
module.exports = UserModel