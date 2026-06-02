require('dotenv').config()

const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser())

const connectDB = require('./config/db')

const PORT = process.env.PORT || 8080

const errorHandler = (err, req, res, next) => {
  const error = { ...err};
  error.message = err.message;
  console.log(err)
  
  if(err.name === 'CastError'){
    const message = `Resource not found with Id of ${err.value}`;
    return res.status(404).json({success: false, error: {message}})
  }

  if(err.code === 11000){
    const message = `Duplicate value entered`;
    return res.status(400).json({
      success: true,
      error: {message}
    })
  }

  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message)
    return res.status(400).json({
      success: false,
      error: { message }
    })
  }
  
  res.status(500).json({
    success: false,
    error: {message: 'Internal Server Error' } 
  });
};

app.get("/", async (req,res) => {
  res.send("Welcome to the Blogify API! This is the main entry point.")
})

app.get('/error-test', (req,res,next) => {
  next(new Error("Testing Error handler"))
})

const mainRouter = require("./routes/index")
app.use("/api/v1", mainRouter)

connectDB()
app.use(errorHandler) 

app.listen(PORT, () => {
  console.log(`Server Running successfully on port http://localhost:${PORT}`)
})