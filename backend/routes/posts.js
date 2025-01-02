import express from "express"

const router = express.Router()

router.get("/",(re,res)=>{
    res.json("this is post")
})

export default router