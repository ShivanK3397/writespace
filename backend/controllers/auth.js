import {db} from "../db.js"
import bcrypt from "bcryptjs"
export const register = (req,res)=>{
    //CHECK EXISTING USER
    const query ="SELECT * FROM users WHERE email = ? OR username = ?"
    console.log(req.body);
    db.query(query,[req.body.email,req.body.username],(err,data)=>{
      
        
        if(err) {
            console.log(err);
            
            return res.json(err)}
        if(data.length){return res.status(409).json("User already exists")}

        //Hashing password and creating user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(hash);
        
        const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values =[
            req.body.username,
            req.body.email,
            hash,
        ]
        db.query(query,[values],(err,data)=>{
            if(err) {return res.json(err)}
            return res.status(200).json("User created")
        });
    })

}

export const login = (req,res)=>{

}

export const logout = (req,res)=>{

}