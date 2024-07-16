import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './db/dbConn.js'
import userRouter from './routers/user.router.js'
import companyRouter from './routers/company.router.js'
import { errorHandler } from './middlewares/errHandler.js'
import jobRouter from './routers/job.router.js'

dotenv.config()

dbConnection()

const app = express()
app.use(express.json())

app.use('/users', userRouter)
app.use('/company',companyRouter)
app.use('/job',jobRouter)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
