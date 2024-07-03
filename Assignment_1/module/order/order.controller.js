import {connectionToDB} from '../../db/db_connection'
const conn = connectionToDB()

export const addProduct =(req,res)=>{
  connect.query(
    `INSERT INTO product SET ?`,
    req.body,
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
