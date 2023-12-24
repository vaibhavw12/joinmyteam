import React from 'react'
import './JobCard.css'
import { useNavigate } from 'react-router-dom'

export default function JobCard(props) {
    
    const jobs = props.jobs
    const navigate = useNavigate()
    const goToeditJobs = ()=>{
        navigate(`/sign-in/edit-job/${jobs._id}`)
    }
    const goToviewDetails = ()=>{
        navigate(`/sign-in/view-job/${jobs._id}`)
    }
  return (
   <div className='jobCardComp'>
          {/* {jobs && jobs.map((item ,index)=>(
              <span key={index}>{item.skills.map((inner,innerIndex)=>(
                <span>{inner}</span>
              ))}<br></br></span>
             
            ))} */}
            <div className='jobCard'>
                    <div className='left-jobcard'>
                        <img src='' alt='img'></img>
                        <div className='left-jobcard-1'>
                            <span>{jobs.position}</span>
                            <span>₹ {jobs.salary}   🇮🇳 {jobs.location}</span>
                            <span>{jobs.remote} {jobs.jobType}</span>
                        </div>
                    </div>
                    <div className='right-jobcard'>
                        <div className='right-skilljobcard'>
                            {jobs.skills.map((item, index)=>(
                                <span className='eachright-skilljobcard' key={index}>{item}</span>
                            ))}
                        </div><br></br>
                        <div className='right-skilljobcard-1'>
                            <button onClick={goToeditJobs} className='edit-skilljobcard'>Edit job</button>
                            <button onClick={goToviewDetails} className='view-skilljobcard'>View details</button>
                        </div>
                    </div>
            </div>
   </div>
  )
}
