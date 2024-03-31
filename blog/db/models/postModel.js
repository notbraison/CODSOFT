const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = new Schema({
    title: {type: String,required:true},
    description: {type: String, required:true},
    date: {type:Date, default: Date.now},
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // Array to store comment IDs
})

post.index({ title: 'text', description: 'text' });

const Post =mongoose.model("Post",post)

module.exports = Post