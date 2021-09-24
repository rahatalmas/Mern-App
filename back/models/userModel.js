const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    }
},{timestamps:true})

const userModel = mongoose.model('user',userschema);

module.exports = userModel;