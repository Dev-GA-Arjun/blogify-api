require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())



const connectDB = require('./config/db')

const PORT = process.env.PORT || 8080

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error' 
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