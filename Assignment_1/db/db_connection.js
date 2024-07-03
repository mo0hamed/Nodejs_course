import mysql from 'mysql2'

export const con = () => {
  const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:  '',
    database: 'Assignment_1'
  })
  connection.connect((err)=>{
    if(err)
      console.log(err)
    else
      console.log("database connected")
    return connection
  })
}



