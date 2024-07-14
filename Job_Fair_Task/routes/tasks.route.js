import express from 'express'
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js'
import auth from '../middleware/auth.js'

const taskRouter = express.Router()

taskRouter.post('/', auth, createTask)

taskRouter.get('/', auth, getAllTasks)

taskRouter.get('/:id', auth, getTaskById)

taskRouter.put('/:id', auth, updateTask)

taskRouter.delete('/:id', auth, deleteTask)

export default taskRouter
