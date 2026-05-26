const mongoose = require('mongoose')
const User = require('./users.models')

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    }
},{
    timestamps: true
})

const Posts = mongoose.model("Posts",postsSchema)
module.exports = Posts