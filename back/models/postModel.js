const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    story:{
        type:String,
        required:true,
        trim:true
    },
    photo:{
        type:String,
        //required:true,
        trim:true
    }
},{timestamps:true});

const postModel = mongoose.model('post',postSchema);

module.exports = postModel;