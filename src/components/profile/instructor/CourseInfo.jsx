import React, { useState } from 'react'
import DropzoneFileInput from '../../common/DropzoneFileInput'
import { RxCross2 } from "react-icons/rx";
import YellowBlackBtn from '../../HomePage/YellowBlackBtn';
import { RiArrowRightWideFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../../features/profile/profileSlice';
import { useForm } from 'react-hook-form';

function CourseInfo() {

  const [listRequirement,setListRequirement]=useState([])

  const {currentStep}=useSelector((state)=>state.profile)
  const dispatch=useDispatch();


  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    console.log("Clicked")
    console.log("current Step, Data=> ", currentStep, data)
    dispatch(setCurrentStep(currentStep + 1));
  };



  const handelAddList =  ()=>{
    const topush=getValues('requirement')
    if(topush.trim()==='') return;
    console.log("Clicked => ",topush)
    setListRequirement((prev)=>[
      ...prev,
      topush,
    ])
    setValue('requirement', '');
  }


  const handelDeleteList=(index)=>{
    const newListRequirement=listRequirement.filter((_,i)=> i!==index)
    setListRequirement(newListRequirement)
  }


  return (
    <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-9'>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="courseTitle">Course Title</label>
          <input 
            type="text" 
            name="courseTitle" 
            id="courseTitle" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg '
            {...register('courseTitle',{ required: true })}
          />
          {errors.courseTitle && <p className='text-[#FF0000] text-xs'>Course Title is required *</p>}
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="courseDescp">Course Short Description</label>
          <textarea 
            rows={5}
            type="text" 
            name="courseDescp" 
            id="courseDescp" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg min-h-[150px]'
            {...register('courseDescp',{ required: true })}
          />
          {errors.courseDescp && <p className='text-[#FF0000] text-xs'>Course Description is required *</p>}
        </div>

        <div className='flex flex-col space-y-2 relative'>
          <label htmlFor="coursePrice">Course Price</label>
          <input 
            type="Number" 
            name="coursePrice" 
            id="coursePrice" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg pl-10 '
            {...register('coursePrice',{ required: true })}
          />
          {errors.coursePrice && <p className='text-[#FF0000] text-xs'>coursePrice is required *</p>}
          <span className='absolute top-9 left-4'>रू</span>
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="courseTag">Tags</label>
          <input 
            type="text" 
            name="courseTag" 
            id="courseTag" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg '
            {...register('courseTag',{ required: true ,  valueAsNumber: true,})}
          />
          {errors.courseTag && <p className='text-[#FF0000] text-xs'>Tags is required *</p>}
        </div>

        <div  className='flex flex-col space-y-2'>
          <label htmlFor="thumbnail">Course  Thumbnail</label>
          <DropzoneFileInput register={register('thumbnail', { required: true })} />
          {errors.courseTag && <p className='text-[#FF0000] text-xs'>Thumbnail is required *</p>}
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="courseAdvg">Benefits of the course</label>
          <textarea 
            type="text" 
            name="courseAdvg" 
            id="courseAdvg" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg min-h-[90px]'
            {...register('courseAdvg',{ required: true })}
          />
          {errors.courseAdvg && <p className='text-[#FF0000] text-xs'>Benefits of the course is required *</p>}
        </div>


        <div className=''>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="requirement">Requirements/Instructions</label>
            <input 
              type="text" 
              name="requirement" 
              id="requirement" 
              className='bg-richblack-600 rounded-md px-4 py-2 text-lg '
              {...register('requirement',{ required:  !listRequirement.length })}
              />
              {errors.requirement && <p className='text-[#FF0000] text-xs'>Requirements/Instructions is required *</p>}
          </div>
          <div className='mt-3 px-2'>
              <div onClick={handelAddList} className='text-yellow-50 font-semibold hover:cursor-pointer'>ADD</div>
          </div>

          <div className='mt-3 px-3'>
            <ul className='text-sm text-richblack-5 space-y-2 list-disc'>
              {
                listRequirement.map((element,index)=>(
                  <div key={index} className='flex items-center gap-x-4'>
                    <li >{element}</li>
                    <div onClick={()=>handelDeleteList(index)} className='items-center flex p-1 rounded-full bg-yellow-50 hover:cursor-pointer'>
                      <RxCross2 color='red' size={15}/>
                    </div>
                  </div>
                ))
              }
            </ul>
          </div>

        </div>

        <div className='flex justify-end'>
          <div className='w-[20%]'>
            <button type='submit'>
              <YellowBlackBtn colour={'Yellow'}>Next <RiArrowRightWideFill /></YellowBlackBtn>
            </button>
          </div>
        </div>

      </div>
     </form>
    </div>
  )
}

export default CourseInfo