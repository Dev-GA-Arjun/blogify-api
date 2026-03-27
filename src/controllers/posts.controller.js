
const getAllPosts = (req,res) => {
    res.status(200).json({
        "succes": true,
        "data": "Fetching all blog posts from the modular router!"
    })
}

const getPostsById = async (req,res) => {
    const postId = await req.params.id
    res.status(200).json({ "success": true, "data": {"Fetching data for post with ID: " : postId}})
}

module.exports = {getAllPosts, getPostsById};
