import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './AddJob.css'
import addjobImg from '../assets/WallpaperDog-20567151 1.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function EditJob() {

    const {jobId} = useParams()
    // console.log(jobId)
    const [obj, setObj] = useState([])
    const [skillStr, setSkillStr] = useState('')
    useEffect(()=>{
        axios
          .get(`http://localhost:4000/api/auth/profile/jobdiscription/${jobId}`, {
            headers: {
              'Content-Type': 'application/json',
              'jwttoken': localStorage.getItem('token'),  // Include the JWT token in the Authorization header
            }
          })
          .then((res) =>{
            setObj(res.data.data)
            const arr = res.data.data.skills
            // let str = ''
            // obj.skills.map((skill)=>{
            //   str = str + skill
            // })
            // console.log()
            setSkillStr(arr.join(','))
          })
          .catch(err => console.error(err));
      },[jobId])

    const handleChangeSkills = (e)=>{
      setSkillStr(e.target.value)
    }
    const handleChange = (e)=>{
      setObj({...obj, [e.target.name] : e.target.value})
    }
    const navigate = useNavigate()
    const goToViewDetails = (e) =>{
      navigate(`/sign-in/view-job/${jobId}`)
    }
    const submitData = (e)=>{
      e.preventDefault()
      obj.skills = skillStr.split(',').map(value => value.trim());
      console.log(obj)
      axios
          .patch(`http://localhost:4000/api/auth/profile/editjob/${jobId}`,obj , {
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
                <p className='addjob-formtext'>Edit job description</p>
                  <form onSubmit={submitData}>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Company Name</span>
                                  <input name='companyName' value={obj.companyName} onChange={handleChange} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter your company name here'></input><br></br><br></br>
                              </label>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Add logo URL</span>
                                  <input name='companyUrl' value={obj.companyUrl} onChange={handleChange} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter the link'></input><br></br><br></br>
                              </label>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Job position</span>
                                  <input name='position' value={obj.position} onChange={handleChange} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter job position'></input><br></br><br></br>
                              </label>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Monthly salary</span>
                                  <input name='salary' value={obj.salary} onChange={handleChange} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter Amount in rupees'></input><br></br><br></br>
                              </label>
    
                              <label className='addjob-dropdowns'>
                              <div className='addjob-selectfield'>
                                <span className='addjob-fields'>Job Type</span>
                                <select name="jobType" value={obj.jobType} onChange={handleChange} className='addjob-select' required>
                                  <option value="Full-time">Full-time</option>
                                  <option value="Part-time">Part-time</option>
                                </select>
                              </div>
                                <div className='addjob-selectfield'>
                                  <span className='addjob-fields'>Remote/office</span>
                                  <select name='remote' value={obj.remote} onChange={handleChange} className='addjob-select' required>
                                    <option value="Remote">Remote</option>
                                    <option value="Office">Office</option>
                                  </select>
                                </div>
                              </label>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Location</span>
                                  <input name='location' value={obj.location} onChange={handleChange} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter Location'></input><br></br><br></br>
                              </label>
                              <label className='addjob-textareafileds'>
                              <div className='addjob-textareafileds-each'>
                                  <span className='addjob-fields'>Job Description</span>
                                  <textarea name='jobDiscription' value={obj.jobDiscription} onChange={handleChange} required placeholder='Type the job description' className='addjob-textarea'></textarea>
                                </div>
                                <div className='addjob-textareafileds-each'>
                                  <span className='addjob-fields'>About Company</span>
                                  <textarea name='companyInfo' value={obj.companyInfo} onChange={handleChange} required placeholder='Type about your company' className='addjob-textarea'></textarea>
                              </div>
                              </label>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Skills Required</span>
                                  <input name='skills' value={skillStr} onChange={handleChangeSkills} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter the must have skills'></input><br></br><br></br>
                              </label>
                              <label className='addjob-each'>
                                  <span className='addjob-fields'>Information</span>
                                  <input name='additionalInfo' value={obj.additionalInfo} onChange={handleChange} className='addjob-fieldsinput' type='text' 
                                  required placeholder='Enter the additional information'></input><br></br><br></br>
                              </label><br></br>
                              <label className='addjob-btns'>
                              <button onClick={goToViewDetails} className='addjob-btn'>Cancel</button>
                              <button type='submit'  className='canceljob-btn'>Update job</button>
                              </label>
                   </form>
            </div>
          </div>
          <div className='addjob-imgcomp'>
            <p className='addjob-imgtext'>Recruiter update job details here</p>
            <img className='addjob-img' src={addjobImg} alt='addjob-img'></img>
          </div>
        </div>
      )
}
