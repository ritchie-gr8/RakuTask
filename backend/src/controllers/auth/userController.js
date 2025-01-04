import asyncHandler from 'express-async-handler'
import User from '../../models/auth/UserModel.js'
import generateToken from '../../helper/generateToken.js'
import bcrypt from 'bcrypt'

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validate data
    if (!name || !email || !password) {
        return res.status(400).json({
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

        return res.status(201).json({
            _id, name, email,
            role, photo, bio,
            isVerified, token,
        })
    } else {
        return res.status(400).json({
            message: 'Invalid user data'
        })
    }

})

export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    // check req body
    if (!email || !password) {
        return res.status(400).json({
            message: 'Invalid request body'
        })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: 'User not found'
        })
    }

    // check the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    // generate token
    const token = generateToken(user._id)

    if (user && isMatch) {
        const {
            _id, name, email,
            role, photo, bio,
            isVerified,
        } = user

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: true,
            secure: true,
        })

        return res.status(201).json({
            _id, name, email,
            role, photo, bio,
            isVerified, token,
        })
    } else {
        return res.status(400).json({
            message: 'Invalid user data'
        })
    }
})