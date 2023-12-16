import React, { useState } from 'react'
import Home from './Home'
import './SignUp.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SignIn() {

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        mobile : '',
        password : ''
    })

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const submitData = (e)=>{
        e.preventDefault()
        axios
          .post("http://localhost:4000/api/auth/register",formData)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));     
    }
  return (
    <div className='sign-up'>
        <div className='sign-upcomp'>
            <div className='sign-upcard' >
                    <p><span className='text-1'>Create an account</span><br>
                    </br><br></br>
                        Your personal job finder is here</p>
                    <form onSubmit={submitData}>
                        <label>
                            <input name='name' onChange={handleChange} className='field' type='text' 
                            required placeholder='Name'></input><br></br><br></br>
                        </label>
                        <label>
                            <input name='email' onChange={handleChange} className='field' type='email' 
                            required placeholder='Email'></input><br></br><br></br>
                        </label>
                        <label>
                            <input name='mobile' onChange={handleChange} className='field' type='text' 
                            required placeholder='Mobile'></input><br></br><br></br>
                        </label>
                        <label>
                            <input name='password' onChange={handleChange} className='field' type='password' 
                            required placeholder='Password'></input><br></br><br></br>
                        </label>
                        <label>
                            <input className='checkbox' required type='checkbox'></input>
                            <span className='text-2'>By creating an account, I agree to our terms of use and privacy policy
                            </span><br></br><br></br>
                        </label>
                        <button type='submit' className='create-btn'>Create Account</button>
                        <p>Already have an account? <Link className='link' to={'/sign-in'}>Sign In</Link></p>
                    </form>
            </div>
        </div>
        <div className='home-card'>
            <Home></Home>
        </div>
    </div>
  )
}
