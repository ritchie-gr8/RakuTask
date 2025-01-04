import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword
} from '../controllers/auth/userController.js'
import { protect, adminMiddleware, creatorMiddleware } from '../middleware/authMiddleware.js'
import { deleteUser, getAllUsers } from '../controllers/auth/adminController.js'

const router = express.Router()

// user routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

router.get('/user', protect, getUser)
router.patch('/user', protect, updateUser)

// admin routes
router.get('/admin/users', protect, creatorMiddleware, getAllUsers)
router.delete('/admin/users/:id', protect, adminMiddleware, deleteUser)

// login status
router.get('/login-status', userLoginStatus)

// verify user
router.post('/verify-email', protect, verifyEmail)
router.post('/verify-user/:verificationToken', verifyUser)

// password routes
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:resetPasswordToken', resetPassword)
router.patch('/change-password', protect, changePassword)

export default router