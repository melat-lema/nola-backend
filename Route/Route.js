const express= require("express")
const router= express.Router()
const {register, login, checkUser}= require("../controller/useController")
const authMiddleware= require("../middleware/authMiddleware")




router.post("/register", register)
router.post("/login", login)
router.get("/check", authMiddleware, checkUser)


module.exports= router;