import React, { useState, useEffect } from 'react'
import './AddJob.css'
import addjobImg from '../assets/WallpaperDog-20567151 1.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 
export default function AddJob() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){

    }else{
      navigate('/')
    }
  },[navigate])
  const [formData, setFormData] = useState({
    companyName : '',
    companyUrl : '',
    position : '',
    salary : '',
    jobType : 'Full-time',
    remote : 'Remote',
    location : '',
    jobDiscription : '',
    companyInfo : '',
    skills : [],
    additionalInfo : '',
    name : localStorage.getItem('name')
  })

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  let[skillsStr, setSkillsStr] = useState('')
  const handleChangeSkills = (e) =>{
    setSkillsStr(e.target.value)
  }

  const submitData = (e)=>{
    e.preventDefault()
    formData.skills = skillsStr.split(',').map(value => value.trim());
    console.log(formData)
    axios
      .post("http://localhost:4000/api/auth/profile/createjob",formData,{
        headers: {
          'Content-Type': 'application/json',
          'jwttoken': localStorage.getItem('token'),  // Include the JWT token in the Authorization header
        }
      })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }
  return (
    <div className='addjob-comp'>
      <div className='addjob-form'>
        <div className='addjob-formcard'>
            <p className='addjob-formtext'>Add job description</p>
              <form onSubmit={submitData}>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Company Name</span>
                              <input name='companyName' onChange={handleChange} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter your company name here'></input><br></br><br></br>
                          </label>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Add logo URL</span>
                              <input name='companyUrl' onChange={handleChange} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter the link'></input><br></br><br></br>
                          </label>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Job position</span>
                              <input name='position' onChange={handleChange} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter job position'></input><br></br><br></br>
                          </label>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Monthly salary</span>
                              <input name='salary' onChange={handleChange} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter Amount in rupees'></input><br></br><br></br>
                          </label>

                          <label className='addjob-dropdowns'>
                          <div className='addjob-selectfield'>
                            <span className='addjob-fields'>Job Type</span>
                            <select name="jobType" onChange={handleChange} value={formData.jobType} className='addjob-select' required>
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                            </select>
                          </div>
                            <div className='addjob-selectfield'>
                              <span className='addjob-fields'>Remote/office</span>
                              <select name='remote' onChange={handleChange} value={formData.remote} className='addjob-select' required>
                                <option value="Remote">Remote</option>
                                <option value="Office">Office</option>
                              </select>
                            </div>
                          </label>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Location</span>
                              <input name='location' onChange={handleChange} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter Location'></input><br></br><br></br>
                          </label>
                          <label className='addjob-textareafileds'>
                          <div className='addjob-textareafileds-each'>
                              <span className='addjob-fields'>Job Description</span>
                              <textarea name='jobDiscription' onChange={handleChange} required placeholder='Type the job description' className='addjob-textarea'></textarea>
                            </div>
                            <div className='addjob-textareafileds-each'>
                              <span className='addjob-fields'>About Company</span>
                              <textarea name='companyInfo' onChange={handleChange} required placeholder='Type about your company' className='addjob-textarea'></textarea>
                          </div>
                          </label>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Skills Required</span>
                              <input name='skillsStr' value={skillsStr} onChange={handleChangeSkills} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter the must have skills'></input><br></br><br></br>
                          </label>
                          <label className='addjob-each'>
                              <span className='addjob-fields'>Information</span>
                              <input name='additionalInfo' onChange={handleChange} className='addjob-fieldsinput' type='text' 
                              required placeholder='Enter the additional information'></input><br></br><br></br>
                          </label><br></br>
                          <label className='addjob-btns'>
                          <button type='submit' className='addjob-btn'>Cancel</button>
                          <button className='canceljob-btn'>+ Add job</button>
                          </label>
               </form>
        </div>
      </div>
      <div className='addjob-imgcomp'>
        <p className='addjob-imgtext'>Recruiter add job details here</p>
        <img className='addjob-img' src={addjobImg} alt='addjob-img'></img>
      </div>
    </div>
  )
}
