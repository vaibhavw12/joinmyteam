import React,{useState} from 'react'
import Home from './Home'
import { Link, useNavigate  } from 'react-router-dom'
import './SignIn.css'
import axios from 'axios'

export default function SignIn() {

  const navigate = useNavigate ()
  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const handleChange = (e)=>{
      setFormData({...formData, [e.target.name] : e.target.value})
  }

  const submitData = (e)=> {
    e.preventDefault()
    axios
      .post("http://localhost:4000/api/auth/login",formData)
      .then((res)=>{
        navigate('/')
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('name',res.data.name )
        console.log(res.data)
      })
      .catch(err => console.error(err));
  }
  return (
    <div className='sign-in'>
        <div className='sign-incomp'>
           <div className='signin-card'>
           <p><span className='signintext-1'>Already have an account?</span><br>
                    </br><br></br>
                  Your personal job finder is here</p>
                  <form onSubmit={submitData}>
                        <label>
                            <input className='signin-field'name='email' onChange={handleChange} type='email' 
                            required placeholder='Email'></input><br></br><br></br>
                        </label>
                        <label>
                            <input className='signin-field' name='password' onChange={handleChange} type='password' 
                            required placeholder='Password'></input><br></br><br></br>
                        </label>
                        <button type='submit' className='signin-btn'>Sign In</button>
                        <p>Don't have an account? <Link className='link' to={'/register'}>Sign Up</Link></p>
                    </form>
           </div>
        </div>
        <div className='home-card'>
            <Home></Home>
        </div>
    </div>
  )
}
