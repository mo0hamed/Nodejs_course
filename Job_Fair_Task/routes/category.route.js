import express from 'express'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller.js'
import auth from '../middleware/auth.js'

const categoryRouter = express.Router()

categoryRouter.post('/', auth, createCategory)

categoryRouter.get('/', auth, getAllCategories)

categoryRouter.get('/:id', auth, getCategoryById)

categoryRouter.put('/:id', auth, updateCategory)

categoryRouter.delete('/:id', auth, deleteCategory)

export default categoryRouter
