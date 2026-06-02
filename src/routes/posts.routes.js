const express = require("express")
const { body } = require('express-validator')
const router = express.Router()

const protect = require('../middleware/auth.middleware');

const createPostRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
]

const updatePostRules = [
    body('title').optional().notEmpty().withMessage("Title is required"),
    body('content').optional().notEmpty().withMessage("Content is required")
]

const {getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/posts.controller")

//Public
router.get("/", getAllPosts)
router.get("/:id", getPostById)
//Private
router.post("/",protect,createPostRules, createPost)
router.patch("/:id",protect, updatePostRules, updatePost)
router.delete("/:id",protect, deletePost)


module.exports = router;

