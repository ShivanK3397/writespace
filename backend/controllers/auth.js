import {db} from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = (req,res)=>{
    //CHECK EXISTING USER
    const query ="SELECT * FROM users WHERE email = ? OR username = ?"
    
    db.query(query,[req.body.email,req.body.username],async (err,data)=>{
      
        
        if(err) {return res.status(500).json(err)}
        if(data.length){return res.status(409).json("User already exists")}

        //Hashing password and creating user

        const salt = await bcrypt.genSaltSync(10); // Generate a salt
        const hash = await bcrypt.hashSync(req.body.password, salt);
        
        
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
    console.log(req.body);
    
    const query = "SELECT * FROM users WHERE username =?"
    db.query(query,[req.body.username], (err,data)=>{
      if (err) {
     
        
        return res.json(err)
    }  
    if(data.length===0){
        return res.status(404).json("User not found")
    }


    //Check Password

    const isPasswordCorrect  = bcrypt.compareSync(req.body.password,data[0].password)

    if (!isPasswordCorrect){
   
        return res.status(400).json("Wrong username or password")
    }

    const token = jwt.sign({id:data[0].id},"jwtkey");
    const {password, ...other} = data[0]
    res.cookie("acces_token",token,{
        httpOnly:true
    }).status(200).json(other)

    
     
    })

}

export const logout = (req,res)=>{

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User logged out.")
}