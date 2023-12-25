import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ViewDetails.css'
import axios from 'axios'
import {isLoggedIn} from '../utils/check.js'

export default function ViewDetails() {

    const {jobId} = useParams()
    // console.log(jobId)

    const [login, setLoggedIn] = useState(isLoggedIn())
    const [obj, setObj] = useState([])
    // var obj = {
    // companyName : 'cuvette',
    // companyUrl : 'https://cuvette.tech/',
    // position : 'software developer',
    // salary : '30,000',
    // jobType : 'Full-time',
    // remote : 'Remote',
    // location : 'Pune',
    // jobDiscription : "We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.Selected intern's day-to-day responsibilities include:1. Work on the development of theme customization, liquid programming language, and corresponding apps2. Implement system integrations that are crucial to our success3. Contribute to the development of HTML5/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences4. Work on speed optimization and making a mobile-friendly website",
    // companyInfo : 'We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.',
    // skills : ['react', 'node', 'java'],
    // additionalInfo : 'Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).',
    // name : localStorage.getItem('name')
    // }
    useEffect(()=>{
        axios
          .get(`http://localhost:4000/api/auth/profile/jobdiscription/${jobId}`, {
            headers: {
              'Content-Type': 'application/json',
              'jwttoken': localStorage.getItem('token'),  // Include the JWT token in the Authorization header
            }
          })
          .then(res => setObj(res.data.data))
          .catch((err)=>{
            console.error(err)
            // localStorage.removeItem('token')
            // localStorage.removeItem('name')
          })
      },[jobId])
    
    const navigate = useNavigate()
    const editpage = ()=>{
        navigate(`/sign-in/edit-job/${jobId}`)
    }

    const logout = ()=>{
        setLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
      }

      const goToLogin = ()=>{
        navigate('/sign-in')
      }
      const goToRegister = ()=>{
        navigate('/register')
      }
  return (
    
    <div className='viewdetails-page'>
        <header className='viewdetails-header'> 
            <div>
                <span className='viewdetails-header-left'>Jobfinder</span>
                
            </div>
            {/* <div className="shapes-container"></div> */}
            <div>
            {login ? 
                  <ul className='viewdetails-header-right'>
                  <li onClick={logout}>Logout</li>
                  <li>Hello! Recruiter</li>
                  <li>profile</li>
              </ul> : 
                <ul className='dashboard-header-right'>
                  <li><button onClick={goToLogin} className='dashboard-loginbtn'>Login</button></li>
                  <li><button onClick={goToRegister} className='dashboard-registerbtn'>Register</button></li>
                </ul>
              }
            </div>
        </header>
        <div className='jobdetail-intro-card'>
            <div className='jobdetail-intro'> 
                    {obj.position} {obj.jobType} job/internship at {obj.companyName} 
            </div>
        </div>
        <div className='jobdetail-card'>
            <div className='jobdetails'> 
                <div className='jobdetailscard'>
                    <p>{1}w ago {obj.jobType} {obj.companyName}</p>
                    <div style={{display : 'flex', justifyContent : 'space-between', alignItems : 'center'}}>
                            <h1>{obj.position}</h1>
                            {login ? 
                                <button className='jobdetails-editbtn' onClick={editpage}>Edit job</button> : 
                                <span></span>
                            }
                    </div>
                    <p>{obj.location}</p>
                    <div>
                        <span>Stipend</span> <br></br>
                        <span>Rs{obj.salary}/month</span>
                    </div>
                    <div>
                        <h3>About Company</h3>
                        <p>{obj.companyInfo}</p>
                    </div>
                    <div>
                        <h3>About job/internship</h3>
                        <p>{obj.jobDiscription}</p>
                    </div>
                    <div>
                        <h3>Skill(s) required</h3>
                        <p>{obj.skills && obj.skills.map((item,index)=>(
                            <span key={index}> {item} ,</span>
                        ))}etc</p>
                    </div>
                    <div>
                        <h3>Additional Information</h3>
                        <p>{obj.additionalInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
