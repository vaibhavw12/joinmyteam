import React from 'react'
import home from '../assets/image 466.png'
import './Home.css'

export default function Home() {
  return (
    <div className='home'>
        <p className='home-text'>Your Personal Job Finder</p>
        <img className='home-img' src={home} alt='home img'></img>
    </div>
  )
}
