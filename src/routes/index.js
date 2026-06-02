const express = require('express')
const router = express.Router();

const postRouter = require('./posts.routes')
const authRouter = require('./auth.routes')


router.use('/posts',postRouter)
router.use('/auth', authRouter)

module.exports = router;
