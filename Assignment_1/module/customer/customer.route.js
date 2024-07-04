import express from 'express'
import { login, signup } from './customer.controller.js'

const customerRouter = express.Router()

customerRouter.post('/signup', signup)

customerRouter.post('/login', login)

export default customerRouter