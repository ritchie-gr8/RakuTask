import asyncHandler from 'express-async-handler'
import User from '../../models/auth/UserModel.js'
import generateToken from '../../helper/generateToken.js'

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validate data
    if (!name || !email || !password) {
        res.status(400).json({
            message: 'Invalid request body'
        })
    }

    // check password
    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characthers'
        })
    }

    // check user
    const user = await User.findOne({
        email
    })
    if (user) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    // create new user
    const newUser = await User.create({
        name,
        email,
        password,
    })

    // generate token with user id
    const token = generateToken(newUser._id)

    // send back user data and token
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: true,
        secure: true,
    })

    if (newUser) {
        const {
            _id, name, email,
            role, photo, bio,
            isVerified,
        } = newUser

        res.status(201).json({
            _id, name, email,
            role, photo, bio,
            isVerified, token,
        })
    } else {
        res.status(400).json({
            message: 'Invalid user data'
        })
    }

})