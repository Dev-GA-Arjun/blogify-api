const {validationResult} = require('express-validator')
const postService = require('../services/posts.services')

const getAllPosts = async (req, res, next) => {
    try{
        const allPosts = await postService.getAllPosts(req.query);
        res.status(200).json({
            success: true,
            data: allPosts
        })
    }catch(err){
        next(err)
    }
};

const getPostById = async (req, res, next) => {
    try{
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        if(!post){
            return res.status(404).json({
                success: false,
                error: {
                    message: `Post with ID ${postId} not found`
                }
            })
        }
        res.status(200).json({
            success: true,
            data: post
        })
    }catch(err){
        next(err)
    }
    
};

const createPost = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        const { title, content, author } = req.body;
        const newPost = await postService.createPost({title, content, author})
        res.status(201).json({
            success: true,
            data: newPost
        })
    }catch(err){
        next(err)
    }
}

const updatePost = async (req, res, next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        const updatedPostData = req.body;
        const id = req.params.id;
        const updatedPost = await postService.updatePost( id, updatedPostData);

        if(!updatedPost){
            return res.status(404).json({
                success: false,
                message: `Post with ID ${id} not found`
            })
        }

        res.status(200).json({
            success: true,
            data: updatedPost
        })
    }catch(err){
        next(err)
    }
}

const deletePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const currentId = req.user.id;
        
        const post = await postService.getPostById(id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: `Post with ID ${id} not found`
            })
        }
        if(post.author.toString() !== currentId){
            return res.status(403).json({
                success: false,
                error: {
                    message: "You are not authorized to delete this post"
                }
            })
        }
        await postService.deletePost(id);
        return res.status(204).send()
        
    }catch(err){
        next(err)
    }
}
module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };