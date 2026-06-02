const Posts = require('../models/posts.models.js');

const createPost = async (postData) => {
  const newPost = await Posts.create(postData);
  return newPost;
};

const getAllPosts = async (queryParams) => {
  const {author, sortBy, limit = 10, page = 1} = queryParams;
  const filter = {};
  if(author){
    filter.author = author;
  }

  const sortOptions = {};
  if(sortBy){
    const [ field, order ] = sortBy.split(':');
    sortOptions[field] = order === 'desc' ? -1 : 1;
  }else{
    sortOptions.createdAt = -1;
  }

  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);

  const skipValue = (pageValue - 1) * limit;

  const posts = await Posts.find(filter)
    .sort(sortOptions)
    .skip(skipValue)
    .limit(limitValue)
    .populate('author', 'username');
  return posts;
    
}

const getPostById = async (id) => {
  const post = await Posts.findById(id).populate('author', 'username email');
  return post;
}

const updatePost = async (id, updatedPostData) => {
  const updatedPost = await Posts.findByIdAndUpdate(id, updatedPostData, { returnDocument: 'after', runValidators: true });
  return updatedPost;
}

const deletePost = async (id) => {
  const deletedPost = await Posts.findByIdAndDelete(id);
  return deletedPost;
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}