import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'



const Login = () => {
  const [inputs,setInputs] =useState({
    username:"",
    password:""
  })

  const [err,setError] = useState(null)

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const navigate = useNavigate()

  const{login} =useContext(AuthContext);

  
  

  const handleSubmit = async e=>{
    
    e.preventDefault()
    try{
      await login(inputs)
      navigate("/")
    
    }
    catch(err){
    setError(err.response.data)
      
    }

  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form >
        <input type="text" placeholder='username' name = "username" onChange={handleChange} />
        <input type="password" placeholder='password' name="password" onChange={handleChange}/>
      {err && <p>{err}</p>}
        <button onClick={handleSubmit}>Login</button>
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login
