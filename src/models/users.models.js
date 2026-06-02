const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unquie: true,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: 6,
        trim: true,
        required: true
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;