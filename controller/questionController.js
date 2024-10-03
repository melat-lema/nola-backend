const express= require("express")
const dbConnection= require("../dbConfig/dbConfig")
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function ask(req, res){
  const {title, description, userid}= req.body;
  const questionid = uuidv4();

  // const userid= req.user.userid
  if( !title || !description){ 
    return res.status(400).json({ msg: "Please follow the above step correctly"})
  }
  try{
  await dbConnection.query("INSERT INTO questions(title, description, questionid, userid) VALUES (?,?,?,?)", [title, description, questionid, userid])
  return res.status(201).json({msg: "question sented to db sucessfully"})}
  catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: "something went wrong!"})
  }
}
async function post (req, res){
  // res.send("hello")
  try{
  const [question]= await dbConnection.query("select title, description, questionid, username from questions INNER JOIN users ON questions.userid=users.userid ORDER BY ID DESC")
  // const [ques]= await dbConnection.query("select username from users where userid=?",[userid])

  // return res.send(JSON.stringify(question[0]));
  
  return res.status(StatusCodes.OK).json( question)
  
  
  }

catch(error){
  return res.status(StatusCodes.BAD_REQUEST).json({msg: "no data recieved"})
}
}
async function single(req,res){
  // const {questionid}= req.body
  
  try{
    const {questionid} = req.params;
    const [question]= await dbConnection.query("select title, description, questionid from questions where questionid=?", [questionid])
    // return res.send(JSON.stringify(question[0]));
    // console.log(questionid))
    return res.status(StatusCodes.OK).json( question[0] )   
    }
  catch(error){
    console.log(error.messge)
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "no data recieved"})
}
}
async function selector(req,res){
  const{userid}=req.body
  const [ques]= await dbConnection.query("select username from users where userid=?",[userid])
  return res.status(StatusCodes.OK).json( ques)

}
module.exports={ask,post, single,selector}