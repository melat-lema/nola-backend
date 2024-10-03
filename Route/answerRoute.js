const express= require("express")
const router= express.Router()
const {answer, sendData}= require("../controller/answerController")


router.post("/all-answers",  answer)
router.get("/specific/:questionid", sendData)

module.exports=router