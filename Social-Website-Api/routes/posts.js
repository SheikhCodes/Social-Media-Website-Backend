import express from "express"
import {getPosts,addPost,deletePost} from "../controllers/post.js"
const router=express.Router()

router.get("/getposts",getPosts)
router.post("/addpost",addPost)
router.delete("/deleteposts/:id",deletePost)

export default router