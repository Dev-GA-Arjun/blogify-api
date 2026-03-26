const express = require('express')
const app = express()
const PORT = 3000

const postRouter = require("./routes/posts.routes")

app.get("/", async (req,res) => {
  res.send("Welcome to the Blogify API! This is the main entry point.")
})

app.use("/api/v1/posts", postRouter)

app.listen(PORT, () => {
  console.log(`Server Running successfully on port ${PORT}`)
})