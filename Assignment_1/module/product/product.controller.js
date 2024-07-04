import {connectionToDB} from '../../db/db_connection.js'
const connect = connectionToDB()

export const addProduct =(req,res)=>{
  const {id,product_name,category,unit_price } = req.body
  connect.query(
    'INSERT INTO product SET ?',
    { id,product_name,category,unit_price,},
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const totalRevenue =(req,res)=>{
  connect.query(
    `SELECT category, sum(unit_price) AS total_revenue
     FROM product
     GROUP BY category
     `,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}

export const totalNumOfItemsSold =(req,res)=>{
  connect.query(
    `SELECT p.id, SUM(oi.quantity) AS Total_Items
     FROM product p
     LEFT JOIN OrderItems on p.id=oi.product_id
     GROUP BY p.id
     `,
    req.body,
    (err, result) => {
      if (err) return res.json({ message: err })
      else res.json(result)
    }
  )
}
