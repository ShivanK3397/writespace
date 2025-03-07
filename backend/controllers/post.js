import { db } from "../db.js"
import jwt from "jsonwebtoken"
export const getPosts = (req,res)=>{
   const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

   db.query(q,[req.query.cat],(err,data)=>{
    if(err){
        return res.status(500).send(err)
    }
    return res.status(200).json(data);
   }) 
}
export const getPost = (req,res)=>{
    const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
    db.query(q,[req.params.id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data[0]);
    })
}
export const addPost = (req,res)=>{
    const token = req.cookies.access_token;
    
    
   if(!token){
    return res.status(401).json("Not authenticated!")
   }
   jwt.verify(token,"jwtkey",(err,info)=>{
    if(err){
        return res.status(403).json("Token is not valid")
    }
    const query = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        info.id
    ]
    
    db.query(query,[values],(err,data)=>{
        if(err){
            
            
            return res.status(500).json(err)
        }
        return res.json("Post created")
    })
})
   
   
}
export const deletePost = (req,res)=>{
    const token = req.cookies.access_token;
    console.log(token);
    
    
   if(!token){
    return res.status(401).json("Not authenticated!")
   }

   jwt.verify(token,"jwtkey",(err,info)=>{
    if(err){
        return res.status(403).json("Token is not valid")
    }
    const postID = req.params.id
    const q = "DELETE FROM posts where `id`= ? AND `uid`=?"
    db.query(q,[postID,info.id],(err,data)=>{
       if(err){
      
        return res.status(403).json("Can only delete your own posts")
       } 
       
       
       return res.json("Post deleted");
    })
   })
}
export const  updatePost = (req,res)=>{
    const token = req.cookies.access_token;
    
    
   if(!token){
    return res.status(401).json("Not authenticated!")
   }
   jwt.verify(token,"jwtkey",(err,info)=>{
    if(err){
        return res.status(403).json("Token is not valid")
    }
    const postID = req.params.id
    const query = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=?, WHERE `id`=? AND `uid`=?"

    const values = [
        req.body.titkle,
        req.body.desc,
        req.body.img,
        req.body.cat,
        info.id
    ]
    
    db.query(query,[...values,postID,info.id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.json("Post updates")
    })
})
}