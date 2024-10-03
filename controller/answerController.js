const express= require("express")
const dbConnection= require("../dbConfig/dbConfig")
const { StatusCodes } = require("http-status-codes");

async function answer(req, res){
  const {answer, userid,questionid}= req.body;
   
  if( !answer){ 
    return res.status(400).json({ msg: "Please enter your answer!!"})
  }
  try{
    
  await dbConnection.query("INSERT INTO answers(answer, questionid, userid) VALUES (?,?,?)", [answer, questionid, userid])
  const [Answer]= await dbConnection.query("select answer, questionid, username from answers INNER JOIN users ON answers.userid=users.userid where questionid=?  ORDER BY answerid DESC limit 1", [questionid])
  return res.status(StatusCodes.OK).json( Answer)
  // return res.status(StatusCodes.OK).json({msg: "answer sucessfully sent to the db"})
  }
  catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: "something went wrong!"})
  }
}
async function sendData(req, res){
  try {
    const {questionid} = req.params;
  const [Answer]= await dbConnection.query("select answer,questionid,username from answers INNER JOIN users ON answers.userid=users.userid where questionid=?  ORDER BY answerid DESC", [questionid])
  
  return res.status(StatusCodes.OK).json( Answer)
} 
  catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: "something went wrong!"})
  
  }
}

module.exports={answer, sendData}