import asyncHandler from 'express-async-handler'
import User from '../../models/auth/UserModel.js'
import generateToken from '../../helper/generateToken.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Token from '../../models/auth/Token.js';
import crypto from 'node:crypto'
import hashToken from '../../helper/hashToken.js';
import sendEmail from '../../helper/sendEmail.js';

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

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        message: 'Logged out'
    })
})

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

export const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        const { name, bio, photo } = req.body

        user.name = name || user.name
        user.bio = bio || user.bio
        user.photo = photo || user.photo

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            photo: updatedUser.photo,
            bio: updatedUser.bio,
            isVerified: updatedUser.isVerified,
        })
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }

})

export const userLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized, Please login'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded) {
        res.status(200).json(true)
    } else {
        res.status(401).json(false)
    }
})

export const verifyEmail = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    if (user.isVerified) {
        return res.status(400).json({
            message: 'User already verified'
        })
    }

    let token = await Token.findOne({
        userId: user._id
    })
    if (token) {
        await token.deleteOne()
    }

    // create a verification token
    const verificationToken = crypto.randomBytes(64).toString('hex') + user._id

    // hash token
    const hashedToken = hashToken(verificationToken)

    await new Token({
        userId: user._id,
        verificationToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }).save();

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const subject = "Email Verification - TaskManager";
    const send_to = user.email;
    const reply_to = "noreply@gmail.com";
    const template = "emailVerification";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const link = verificationLink;

    try {
        await sendEmail(subject, send_to, send_from, reply_to, template, name, link)
        return res.status(200).json({
            message: 'Email sent successfully'
        })
    } catch (error) {
        console.error('Error sending email:', error)
        return res.status(500).json({
            message: 'Cannot send verification email'
        })
    }
})