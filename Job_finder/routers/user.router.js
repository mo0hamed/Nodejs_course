import {Router} from 'express'
import {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  getUserAccount,
  getUserProfile,
  updatePassword,
  getAccountsByRecoveryEmail
} from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.js'

const userRouter = Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', signIn)
userRouter.put('/update', authMiddleware, updateUser)
userRouter.delete('/delete', authMiddleware, deleteUser)
userRouter.get('/account', authMiddleware, getUserAccount)
userRouter.get('/profile', authMiddleware, getUserProfile)
userRouter.put('/password', authMiddleware, updatePassword)
userRouter.get('/recovery-email', getAccountsByRecoveryEmail)

export default userRouter
