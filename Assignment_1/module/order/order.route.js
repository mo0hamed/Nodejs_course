import express from 'express'
import {createOrder,avgValue,noAnyOrders,customerMostOrder
  ,topSpending,atLeastFiveOrders,percentageOfRepeatCustomer,earliestOrder}
  from './order.controller.js'

const orderRouter = express.Router()

orderRouter.post('/createOrder', createOrder)

orderRouter.post('/avgValue', avgValue)

orderRouter.post('/noAnyOrders', noAnyOrders)


orderRouter.post('/customerMostOrder', customerMostOrder)

orderRouter.post('/topSpending', topSpending)

orderRouter.post('/atLeastFiveOrders', atLeastFiveOrders)

orderRouter.post('/percentageOfRepeatCustomer', percentageOfRepeatCustomer)

orderRouter.post('/earliestOrder', earliestOrder)


export default orderRouter
