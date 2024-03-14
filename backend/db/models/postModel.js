const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = new Schema({
    title: {type: String,required:true},
    description: {type: String, required:true},
    date: {type:Date, default: Date.now},
    author: {type:String}
})

const Post =mongoose.model("Post",post)

module.exports = Post