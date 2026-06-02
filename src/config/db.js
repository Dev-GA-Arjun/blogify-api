const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
const connectDB = async () => {
    try{
    const connect = await mongoose.connect(MONGODB_URI)
    console.log("Connection Successful")
    }catch(err){
        console.log("Connection Failed")
        console.log(err.stack)
        process.exit(1)
    }
}

module.exports = connectDB