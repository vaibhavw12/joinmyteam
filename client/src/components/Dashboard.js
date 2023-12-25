import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios';
import JobCard from './JobCard';
import { useNavigate } from 'react-router-dom';
import {isLoggedIn} from '../utils/check.js'

export default function Dashboard() {

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [position, setPosition] = useState('')
  const [jobs, setJobs] = useState([])
  const [login, setLoggedIn] = useState(isLoggedIn())

  const handleskills = (e) => {
    // Check if the selected skill already exists in the array
    if (!selectedSkills.includes(e.target.value)) {
      // Use spread operator to create a new array with the selected skill
      setSelectedSkills([...selectedSkills, e.target.value]);
    }
  };
  const changePosition = (e)=>{
    setPosition(e.target.value)
  }
  const removeSkill = (item)=>{
     // Filter out the skill to remove
     const updatedSkills = selectedSkills.filter(skill => skill !== item);
     // Update the state with the new array
     setSelectedSkills(updatedSkills);
  }
  const clearArr = ()=>{
    setSelectedSkills([]);
  }
  const navigate = useNavigate()
  const addJob = ()=>{
    navigate('/sign-in/add-job')
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

  useEffect(()=>{
    axios
      .get("http://localhost:4000/api/auth/profile/filterjob", {
        params: {
          skills : selectedSkills, // Replace with your skills array
          position: position, // Replace with your position
        },
        headers: {
          'Content-Type': 'application/json',
          'jwttoken': localStorage.getItem('token'),  // Include the JWT token in the Authorization header
        }
      })
      .then(res => setJobs(res.data.data))
      .catch(err => console.error(err));
  },[selectedSkills, position])
  // 
  return (
    <div>
      <header className='dashboard-header'> 
            <div>
                <span className='dashboard-header-left'>Jobfinder</span>
                
            </div>
            {/* <div className="shapes-container"></div> */}
            <div>
              {login ? 
                  <ul className='dashboard-header-right'>
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
        <div className='dashboardfilter-cardouter'>
          <div className='dashboardfilter-card'> 
              <label >
                  <input className='dashboardfilter-inputjobtype' onChange={changePosition} value={position} type='text' placeholder='🔍 Type any job title'></input>
              </label>
              <div className='dashboardfilter-2'>
                  <select onChange={handleskills} className='dashboard-selectskills' >
                    {/* <option value="">Skills</option> */}
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="React js">React js</option>
                    <option value="Node js">Node js</option>      
                    <option value="MongoDb">MongoDb</option>
                    <option value="MySql">MySql</option>      
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="Cpp">Cpp</option>        
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>      
                    <option value="Fullstack">Fullstack</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Web 3.0">Web 3.0</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className='flexskills'>
                            {selectedSkills && selectedSkills.map((item,index)=>(
                      <span className='eachflexskill' key={index}><span className='eachtextskill'>{item}</span><span onClick={() => removeSkill(item)}  className='hideskillbtn'>❌</span></span>
                  ))}
                  </div>
                  {login ? 
                  <button onClick={addJob} className='dashboardaddjob-btn'>
                    + Add job
                  </button> :
                  <span></span>
                  }
                  
              </div>
              <span className='clearskills' onClick={clearArr}>clear</span>
          </div>
        </div>
        <div className='jobcard-dashboard'>
          <div className='eachjobcard-dashboard'>
            {jobs && jobs.map((item ,index)=>(
              <span key={index}><JobCard jobs={item} loggedIn={login}></JobCard></span>
            ))}
          </div>
        </div>
    </div>
  )
}
