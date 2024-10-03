const express= require("express")
const bcrypt= require("bcrypt")
const dbConnection= require("../dbConfig/dbConfig")
const jwt= require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
// const authMiddleware =require( "../middleware/authMiddleware");

async function register(req, res){
  const { username, firstname, lastname, email, password }= req.body;
  if(!username || !firstname || !lastname || !email || !password){
    return res.status(400).json({ msg: "please provide all the required information"})
  }
  try {
    const [user]= await dbConnection.query("select username, userid from users where username=? or email=?", [username, email])
    if(user.length>0){
      return res.status(400).json({msg: "user already existed"})
    }
    if(password.length<=8){
      return res.status(400).json({msg: "password must be atleast 8 characters"})
    }
    const salt= await bcrypt.genSalt(10)

    const hashedPassword= await bcrypt.hash(password, salt)
    await dbConnection.query("INSERT INTO users(username, firstname, lastname, email, password) VALUES (?,?,?,?,?)", [username, firstname, lastname, email, hashedPassword])
    return res.status(201).json({msg: "user created"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg: "something went wrong!"})
  }
}

async function login(req, res){
  const {email, password}= req.body;
  if( !email || !password){
    return res.status(400).json({ msg: "please provide all the required information"})
  }
  try {
    const [user]= await dbConnection.query("select username, userid, password from users where email=?", [email])
    if(user.length==0){
      return res.status(400).json({msg: "Invalid credential"})
    }
    const isMatch= await bcrypt.compare(password, user[0].password)
    if(!isMatch){
      return res.status(400).json({msg: "Invalid credential"})
    }
    const username= user[0].username
    const userid= user[0].userid
    const token= jwt.sign({username, userid}, process.env.JWT_SECRET, {expiresIn:"1d"})
    return res.status(StatusCodes.OK).json({msg: "user login successfull", token})
  } catch (error) {
   console.log(error.message) 
   return res.status(500).json({msg: "please create an account first!"})
  }
}
async function checkUser (req, res){
  // res.send("hello")
  const username= req.user.username
  const userid= req.user.userid
  return res.status(StatusCodes.OK).json({msg: "user valid", username, userid})
}

module.exports= {register, login, checkUser}
