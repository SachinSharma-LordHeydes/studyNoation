import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import DropzoneFileInput from '../components/common/DropzoneFileInput';
import YellowBlackBtn from '../components/HomePage/YellowBlackBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../features/profile/profileSlice';
import { useForm } from 'react-hook-form';
// import { setSubSectionData } from '../features/Courses/sectionSlice';
import { createSubSection, getSubSectionData } from '../services/operations/sectionOperations';

function AddLectureModal() {

  const {modalState,clickedSectionID,clickedSubSectionID}=useSelector((state)=>state.profile)
  const {courseDetails}=useSelector((state)=>state.course)
  const {subSectionData}=useSelector((state)=>state.section)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getSubSectionData(clickedSubSectionID))
    console.log("Subsection Data on Edit From Add Lecture Modal=>",subSectionData)
  },[])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(
    {
      defaultValues:subSectionData?{
        title:subSectionData?.title,
        description:subSectionData?.description,
        video:subSectionData?.videoURL

      }
      :
      {
        title:"",
        description:"",
        video:""
      }
    }
  );

  const createSubSectionFunction=(data)=>{
    console.log("Form Data:", data);
    try {
      const lectureData = {
        title: data.title,
        description: data.description,
        id:clickedSectionID,
        courseId:courseDetails?._id,
        video: data.thumbnail  // The file will be available here
      };
  
      console.log("Lecture Data:", lectureData);
      dispatch(createSubSection(lectureData));
      dispatch(setModalState(!modalState));

    } catch (error) {
      console.log("Error occured on creating Subsection(Front-end)=>",error)
    }
  }

  return (
   <div className='fixed bottom-1 inset-0 bg-opacity-50 flex justify-center items-center z-50 overflow-hidden pb-9 backdrop-blur-sm '>
      <div className='bg-richblack-800 rounded-md mt-9 w-[40%]'>
        <div className='flex justify-between text-richblack-100 items-center bg-richblack-700 rounded-t-md px-3 py-2 font-semibold'>
          <div>Adding Lecture</div>
          <div onClick={()=>dispatch(setModalState(!modalState))} className='hover:cursor-pointer'><RxCross2 /></div>
        </div>
        <div className=' px-5'>
          <form onSubmit={handleSubmit(createSubSectionFunction)}>
            <div className='text-richblack-100'>

              <div className='space-y-2 mt-3 text-sm'>
                <label htmlFor="lectureVideo">Lecture Video</label>
                <DropzoneFileInput register={register('thumbnail', { required: true })} setValue={setValue}></DropzoneFileInput>
                {errors.thumbnail && <p className='text-[#FF0000] text-xs'>Lecture Video is required *</p>}
              </div>

              <div className='space-y-1 flex flex-col mt-5 text-sm'>
                <label htmlFor="lectureVideo">Lecture Title</label>
                <input className='bg-richblack-600 rounded-md px-4 py-2 text-lg'
                  placeholder='Enter Lecture Title' 
                  type='text'
                  name="title" 
                  id="title"
                  {...register('title',{ required: true })}
                />
                {errors.title && <p className='text-[#FF0000] text-xs'>Lecture Title is required *</p>}

              </div>

              <div className='space-y-1 flex flex-col mt-5 text-sm'>
                <label htmlFor="lectureVideo">Lecture Description</label>
                <textarea placeholder='Enter Lecture Description' 
                  className='min-h-[80px] bg-richblack-600 rounded-md px-4 py-2 text-lg' 
                  type='text'
                  name="description" 
                  id="description"
                  {...register('description',{ required: true })}
                />
                {errors.description && <p className='text-[#FF0000] text-xs'>Description is required *</p>}
              </div>

            </div>
            <div className='flex justify-end mt-1 text-sm'>
              <div className='w-[15%] '>
                <button type='submit'>
                  <YellowBlackBtn colour={"Yellow"}>Save</YellowBlackBtn>
                </button>
              </div>
            </div>
          </form>
        </div>

      
      </div>
   </div>
  )
}

export default AddLectureModal