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

module.exports = { getAllPosts, getPostsById };