const { body, validationResult } = require('express-validator')

const registerRules = [
    body('username').notEmpty().trim().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email ID').normalizeEmail(),
    body('password')
    .isLength({min: 8})
    .matches(/(?=.*[A-Z])/).withMessage('Password must contain an uppercase letter')
    .matches(/(?=.*[0-9])/).withMessage('Password must contain a number')
    .matches(/(?=.*[!@#\$%\^&\*])/).withMessage('Password must contain a special character')
]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    return res.status(400).json({
        success: false,
        errors: errors.array()
    })
}

module.exports = { registerRules, validate}