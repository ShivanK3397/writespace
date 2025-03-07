import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from "axios"


const Register = () => {
  const [inputs,setInputs] =useState({
    username:"",
    email:"",
    password:""
  })

  const [err,setError] = useState(null)

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const navigate = useNavigate()

  const handleSubmit = async e=>{
    e.preventDefault()
    try{
     await axios.post("http://localhost:8800/api/auth/register",inputs)
      navigate("/login")
    
    }
    catch(err){
      setError(err.response.data)
      
    }

  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form >
        <input required type="text" placeholder='username'name='username' onChange={handleChange}/>
        <input required type="email" placeholder='email' name="email"onChange={handleChange}/>
        <input required type="password" placeholder='password' name="password" onChange={handleChange}/>
        { err && <p>{err}</p>}
        <button onClick={handleSubmit}>Register</button>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register
