import express from 'express'
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', createUser)

userRouter.get('/', getAllUsers)

userRouter.get('/:id', getUserById)

userRouter.put('/:id', updateUser)

userRouter.delete('/:id', deleteUser)

export default userRouter
