import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }

})

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    if (!users) {
        res.status(404).json({
            message: 'Users not found'
        })
    }

    res.status(200).json(users)
})