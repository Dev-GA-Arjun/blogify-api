const { validationResult } = require('express-validator');
const Posts = require('../models/posts.models.js');

// CREATE POST
const createPost = async (req, res, next) => {
    try {
        // Request validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Extract required fields
        const { title, content, author } = req.body;

        // Create document using Mongoose schema
        const newPost = await Posts.create({
            title,
            content,
            author
        });

        return res.status(201).json({
            success: true,
            data: newPost
        });

    } catch (err) {
        next(err);
    }
};


// GET ALL POSTS
const getAllPosts = async (req, res, next) => {
    try {
        const {
            author,
            sortBy,
            limit = 10,
            page = 1
        } = req.query;

        // Build filter
        const filter = {};

        if (author) {
            filter.author = author;
        }

        // Build sorting
        const sortOptions = {};

        if (sortBy) {
            const [field, order] = sortBy.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1;
        }

        // Pagination
        const limitValue = parseInt(limit);
        const pageValue = parseInt(page);
        const skipValue = (pageValue - 1) * limitValue;

        // MongoDB query
        const posts = await Posts.find(filter)
            .sort(sortOptions)
            .skip(skipValue)
            .limit(limitValue)
            .populate('author', 'username');

        return res.status(200).json({
            success: true,
            data: posts
        });

    } catch (err) {
        next(err);
    }
};


// GET POST BY ID
const getPostById = async (req, res, next) => {
    try {
        const postId = req.params.id;

        const post = await Posts.findById(postId)
            .populate('author', 'username email');

        // Handle non-existent post
        if (!post) {
            return res.status(404).json({
                success: false,
                error: {
                    message: `Post with ID ${postId} not found`
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: post
        });

    } catch (err) {
        next(err);
    }
};


// UPDATE POST
const updatePost = async (req, res, next) => {
    try {
        // Request validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const id = req.params.id;
        const updatedPostData = req.body;

        // Mongoose update with schema validation
        const updatedPost = await Posts.findByIdAndUpdate(
            id,
            updatedPostData,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        // Handle non-existent post
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: `Post with ID ${id} not found`
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedPost
        });

    } catch (err) {
        next(err);
    }
};


// DELETE POST
const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const currentId = req.user.id;

        // First find the post
        const post = await Posts.findById(id);

        // Handle non-existent post
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post with ID ${id} not found`
            });
        }

        // Authorization check
        if (post.author.toString() !== currentId) {
            return res.status(403).json({
                success: false,
                error: {
                    message: 'You are not authorized to delete this post'
                }
            });
        }

        // Delete document
        await Posts.findByIdAndDelete(id);

        return res.status(204).send();

    } catch (err) {
        next(err);
    }
};


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};

