require("dotenv").config()
const express= require("express")
const app=express()
const port= 5000
const cors= require("cors")
const dbConnection= require("./dbConfig/dbConfig")
const userRoutes= require("./Route/Route")
const questionRoutes= require("./Route/questionRoute")
const answerRoute=require("./Route/answerRoute")
app.use(cors())

app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/answers", answerRoute)

async function start(){
  try {
    const result= await dbConnection.execute("select 'test' ")
    await app.listen(port)
    console.log("database successfully connected")
    console.log(`listening to: ${port}`)
  } catch (error) {
    console.log(error.message)
  }
}
start()