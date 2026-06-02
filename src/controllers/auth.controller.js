const Users = require('../models/users.models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try{
        const { username, email, password } = req.body;
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                error: {
                    message: "A user with this email already exists"
                }
            })
        }
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const user = await Users.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }catch(err){
        next(err)
    }
}

const loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                error: {
                    message: "Email and password are Required"
                }
            })
        }
        const user = await Users.findOne({email});
        if(!user){
            return res.status(404).json({
                error: {
                    message: "Invalid credentials"
                }
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                error: {
                    message: "Invalid credentials"
                }
            })
        }

        const token = await jwt.sign({
            id: user._id,
            username: user.username,
            role: 'user'
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        const options = {
            expiresIn: new Date(Date.now() + 1 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }

        res
        .status(200)
        .cookie('token', token, options)
        .json({
            sucess: true,
            data: {
                id: user._id,
                name: user.name
            }
        })

    }catch(err){
        next(err)
    }
}

module.exports = { registerUser, loginUser };