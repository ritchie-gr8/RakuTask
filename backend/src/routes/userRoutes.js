import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser
} from '../controllers/auth/userController.js'
import { protect, adminMiddleware } from '../middleware/authMiddleware.js'
import { deleteUser } from '../controllers/auth/adminController.js'

const router = express.Router()

// user routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

router.get('/user', protect, getUser)
router.patch('/user', protect, updateUser)

// admin routes
router.delete('/admin/users/:id', protect, adminMiddleware, deleteUser)

export default router