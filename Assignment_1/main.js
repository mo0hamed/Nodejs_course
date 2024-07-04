import express from 'express';
import customerRouter from './module/customer/customer.route.js'
import orderRouter from './module/order/order.route.js'
import productRouter from './module/product/product.route.js'



const app = express()

app.use(express.json())

app.use('/customer', customerRouter)
app.use('/order', orderRouter)
app.use('/product', productRouter)


app.listen(3000, () => console.log("Server is running..."))
