
const getAllPosts = (req,res) => {
    res.send("Fetching all blog posts from the modular router!")
}

const getPostsById = async (req,res) => {
    const postId = await req.params.id
    res.json({ "message": "Fetching data for post with ID: " + postId })
}

module.exports = {getAllPosts, getPostsById};
