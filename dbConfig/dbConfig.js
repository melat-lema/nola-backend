const mysql2= require("mysql2")

const dbConnection= mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "127.0.0.1",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});



module.exports = dbConnection.promise()