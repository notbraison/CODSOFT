const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Or use author's name directly if needed
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true });

const Comment = mongoose.model('Comment', comment);

module.exports = Comment;
