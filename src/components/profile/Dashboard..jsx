import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {

  const {userData}=useSelector((state)=>state.auth)


  return (
    <div>
      <div>
            {/* name email */}
            <div className='flex bg-richblack-800 px-9 py-5 rounded-lg justify-between items-center mt-9'>

              <div className='flex items-center gap-5'>

                <div>
                  <img className='size-20 rounded-full' src={userData.imageURL} alt="Img here" />
                </div>

                <div>
                  <div className='flex gap-2'>
                    <h1 className='text-3xl font-bold'>{userData.firstName}</h1>
                    <h1 className='text-3xl font-bold'>{userData.lastName}</h1>
                  </div>
                  <div className='text-richblack-300 mt-1'>
                    {userData.email}
                  </div>
                </div>

              </div>

            </div>

            {/* about */}
            <div  className='flex bg-richblack-800 px-9 py-5 rounded-lg justify-between items-center mt-9'>
              <div>
                <div>
                  <h1 className='text-3xl font-bold'>About</h1>
                </div>
                <div>
                  <p className='text-richblack-300 mt-1'>
                    {
                      userData&&userData.description?userData.description:"Write Something About Yourself"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* personalDetail */}

            <div className='bg-richblack-800 px-9 py-7 rounded-lg mt-9'>
              <div className='flex justify-between '>
                <div className='w-[60%] space-y-9'>
                  <h1 className='text-3xl font-bold mb-5'>Personal Details</h1>
                  <div className='grid grid-cols-2 gap-x-56 gap-y-6'>
                    <div>
                      <div className='text-richblack-5 text-lg'>First Name</div>
                      <div className='text-richblack-500 text-md'>{userData.firstName}</div>
                    </div>
                    <div>
                      <div className='text-richblack-5 text-lg'>Last Name</div>
                      <div className='text-richblack-500 text-md'>{userData.lastName}</div>
                    </div>
                    <div>
                      <div className='text-richblack-5 text-lg'>Email</div>
                      <div className='text-richblack-500 text-md'>{userData.email}</div>
                    </div>
                    <div>
                      <div className='text-richblack-5 text-lg'>Phone Number</div>
                      <div className='text-richblack-500 text-md'>
                        {userData&&userData.contactNum ? userData.contactNum : 'Add Phone Number'}
                      </div>
                    </div>
                    <div>
                      <div className='text-richblack-5 text-lg'>Gender</div>
                      <div className='text-richblack-500 text-md'>
                        {userData&&userData.gender ? userData.gender : 'Add Gender'}
                      </div>
                    </div>
                    <div>
                      <div className='text-richblack-5 text-lg'>Date Of Birth</div>
                      <div className='text-richblack-500 text-md'>
                        {userData&&userData.DOB ? userData.DOB : 'Add DOB'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            
      </div>
    </div>
  )
}

export default Dashboard