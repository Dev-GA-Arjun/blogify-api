const express = require("express")
const router = express.Router()

const postController = require("../controllers/posts.controller")

router.get("/", postController)

router.post("/", (req,res) => {
    res.send('Creating a new blog post...')
})

module.exports = router

