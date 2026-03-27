const express = require("express")
const router = express.Router()

const {getAllPosts, getPostsById} = require("../controllers/posts.controller")

router.get("/", getAllPosts)

router.get("/:id", getPostsById)

router.post("/", (req,res) => {
    res.send('Creating a new blog post...')
})

module.exports = router

