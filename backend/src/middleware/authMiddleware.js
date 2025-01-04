import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    try {

        // check if user is logged in
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({
                message: 'Please login'
            })
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized'
        })
    }
})