import {connectionToDB} from '../../db/db_connection.js'
const connect = connectionToDB()

export const createOrder = (req, res) => {
  const { id, customer_id, order_date, total_amount } = req.body

  connect.query(
    'SELECT * FROM customer WHERE id = ?',
    [customer_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err })
      }
      connect.query(
        'INSERT INTO `order` SET ?',
        { id, customer_id, order_date, total_amount },
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err })
          } else {
            res.status(201).json({ message: 'Order created successfully', result })
          }
        }
      )
    }
  )
}

export const avgValue =(req,res)=>{
  connect.query(
    `SELECT id,AVG(total_amount) AS 
     FROM order
     GROUP BY id
     `,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const noAnyOrders =(req,res)=>{
  connect.query(
    `SELECT * FROM customer 
    WHERE id NOT IN (SELECT DISTINCT customer_id FROM \`order\`)
    `,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const customerMostOrder =(req,res)=>{
  connect.query(
    `SELECT customer_id, SUM(quantity) AS total_items
     FROM order_item 
     GROUP BY customer_id 
     ORDER BY total_items DESC 
     LIMIT 1`,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const topSpending =(req,res)=>{
  connect.query(
    `SELECT customer_id, SUM(total_amount) AS total_spent
    FROM \`order\`
    GROUP BY customer_id
    ORDER BY total_spent DESC
    LIMIT 10`,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const atLeastFiveOrders =(req,res)=>{
  connect.query(
    `SELECT customer_id, COUNT(*) AS order_count
    FROM \`order\`
    GROUP BY customer_id
    HAVING order_count >= 5`,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}
export const percentageOfRepeatCustomer =(req,res)=>{
  connect.query(
    `SELECT 
      (SELECT COUNT(*) FROM (SELECT customer_id FROM \`order\` GROUP BY customer_id HAVING COUNT(*) > 1) AS repeat_customers) 
      / 
      (SELECT COUNT(*) FROM customer) 
      * 100 
      AS percentageOfRepeatCustomer`,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const earliestOrder =(req,res)=>{
  connect.query(
    `SELECT customer_id, MIN(order_date) AS earliest_order_date
    FROM \`order\`
    GROUP BY customer_idmodule/product/product.controller.js
    ORDER BY earliest_order_date ASC
    LIMIT 1`,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

