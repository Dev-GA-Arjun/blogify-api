const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const {registerUser, loginUser} = require('../controllers/auth.controller');
const { registerRules, validate } = require('../middleware/validators')


router.post('/register', registerRules, validate, registerUser);
router.post('/login', loginUser)

module.exports = router;