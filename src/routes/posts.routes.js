const express = require("express")
const { body } = require('express-validator')
const router = express.Router()

const createPostRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
]

const updatePostRules = [
    body('title').optional().notEmpty().withMessage("Title is required"),
    body('content').optional().notEmpty().withMessage("Content is required")
]

const {getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/posts.controller")

router.get("/", getAllPosts)
router.get("/:id", getPostById)
router.post("/",createPostRules, createPost)
router.patch("/:id", updatePostRules, updatePost)
router.delete("/:id", deletePost)


module.exports = router;

