import express from 'express'
import {addProduct,totalRevenue,totalNumOfItemsSold} from './product.controller.js'

const productRouter = express.Router()

productRouter.post('/addProduct', addProduct)

productRouter.post('/totalRevenue', totalRevenue)

productRouter.post('/totalNumOfItemsSold', totalNumOfItemsSold)

export default productRouter