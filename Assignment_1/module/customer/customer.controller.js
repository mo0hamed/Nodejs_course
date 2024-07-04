import {connectionToDB} from '../../db/db_connection.js'
const conn = connectionToDB()

export const signup = (req, res) => {
  const { id ,first_name, last_name, email, phone } = req.body
    conn.query(
      `INSERT INTO customer SET ?`,
      { id,first_name, last_name, email, phone,},
      (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ message: 'Database error', error: err })
        }
        res.status(201).json({ message: 'Customer created successfully', result });
      }
    )
}

export const login = (req, res) => {
  const { first_name, last_name, email} = req.body
  conn.query(
    `SELECT * FROM customer WHERE first_name = ? and last_name = ? and email = ?`,
    [
      first_name,
      last_name,
      email,
    ],
    (err, result) => {
      if (err)
        return res.json({ message: err })
      if (result.length === 0)
        return res.json({ message: 'Customer not found!' })
      else
        res.json({ message: "Logged in success" })
    }
  )
}




