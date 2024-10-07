import React from 'react'
import './Loading.css'

function Loading() {
  return (
    <div className='flex justify-center items-center bg-richblack-900'>
      <div className="spinner">
        <div></div>   
        <div></div>    
        <div></div>    
        <div></div>    
      </div>
    </div>
  )
}

export default Loading