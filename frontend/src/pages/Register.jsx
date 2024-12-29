import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form >
        <input required type="text" placeholder='username' />
        <input required type="email" placeholder='email'/>
        <input required type="text" placeholder='password'/>
        <p>This is an error !</p>
        <button>Register</button>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register
