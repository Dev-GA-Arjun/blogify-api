const express = require('express')
const router = express.Router();

// Imports of Sub-Routes
const postRouter = require('./posts.routes')

// Mount sub-routes to their respective sub-router
router.use('/posts',postRouter)

module.exports = router;
