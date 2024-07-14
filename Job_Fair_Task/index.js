import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/db.js'
import userRoutes from './routes/user.route.js'
import categoryRoutes from './routes/category.route.js'
import taskRoutes from './routes/tasks.route.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT


app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tasks', taskRoutes)

app.use(errorHandler)


sequelize
  .sync() 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })
