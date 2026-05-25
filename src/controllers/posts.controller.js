const Post = require('../models/posts.models')
const {validationResult} = require('express-validator') 

const getAllPosts = (req, res) => {
    
    res.status(200).json({
        success: true, 
        data: "Fetching all blog posts from the modular router!"
    });
};

const getPostById = (req, res) => {
    const postId = req.params.id; 
    res.status(200).json({
        success: true,
        data: {
            message: `Fetching data for post with ID: ${postId}`
        }
    });
};

const createPost = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        const { title, content } = req.body;
        await Post.create({
            title,
            content
        })
        res.status(201).json({
            success: true,
            message: "Successfully created"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = { getAllPosts, getPostById, createPost };