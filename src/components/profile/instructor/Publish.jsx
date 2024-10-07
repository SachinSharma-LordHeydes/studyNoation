import React from 'react'
import YellowBlackBtn from '../../HomePage/YellowBlackBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStep } from '../../../features/profile/profileSlice';

function Publish() {


  const {currentStep,}=useSelector((state)=>state.profile)

  const dispatch=useDispatch();

  return (
    <div>
      <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
        <div>
          <h1 className='text-xl font bold'>Publish Settings</h1>
        </div>
        <div className='items-center mt-9'>
          <input className='mr-3 ' type="checkbox" name='checkBox' />
          <label className='text-richblack-300' htmlFor="checkBox">Make This Course Public</label>
        </div>
      </div>
      <div className='mt-9 flex justify-between w-[90%] mx-auto'>
        <div>
          <button>
            <div onClick={()=>dispatch(setCurrentStep(currentStep - 1))}>
              <YellowBlackBtn>Back</YellowBlackBtn>
            </div>
          </button>
        </div>
        <div className='flex gap-x-4'>
          <div>
            <button>
              <YellowBlackBtn>Save as Draft</YellowBlackBtn>
            </button>
          </div>

          <div>
            <button>
              <YellowBlackBtn colour={'Yellow'}>Save and Public</YellowBlackBtn>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publish