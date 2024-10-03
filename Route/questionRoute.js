const express= require("express")
const router= express.Router()
const {ask,post, single,selector}= require("../controller/questionController")

// const authMiddleware= require("../middleware/authMiddleware")

router.post("/all-questions",  ask)
router.get("/all",post)
router.get("/allin/:questionid", single)
router.get("/name", selector)


module.exports= router