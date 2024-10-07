import React from 'react'
import YellowBlackBtn from '../components/HomePage/YellowBlackBtn'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx';
import { setChangeSectionNameModalState } from '../features/profile/profileSlice';
import { editSection } from '../services/operations/sectionOperations';
import { useForm } from 'react-hook-form';

function ChangeSectionNameModal() {

  
  const { changeSectionNameModalState , clickedSectionID } = useSelector((state) => state.profile);

  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm ();

  function changeSectionNameHandler(data){

    console.log("Modal Data=> ",data.section,clickedSectionID)

    const sectionName=data.section
    if(!sectionName ||sectionName.trim()===''){
      console.log("Name must be given to Section");
      setError("section",{
        type:"manual",
        message:'Cannot accept empty string as Section*'
      })
      return;
    }

    dispatch(editSection(sectionName,clickedSectionID))

    dispatch(setChangeSectionNameModalState(!changeSectionNameModalState))
  }


  
  return (
    <div className='fixed bottom-1 inset-0 bg-opacity-90 flex justify-center items-center z-50 overflow-hidden backdrop-blur-sm'>
     <div className='text-white bg-richblack-800 px-7 pt-7 rounded-md'>
      <div >
        <div className='flex justify-between items-center'>
          <h1 className='text-md font-bold'>Change Section Name</h1>
          <div onClick={()=>dispatch(setChangeSectionNameModalState(!changeSectionNameModalState))} className='hover:cursor-pointer'><RxCross2 size={20} /></div>
        </div>
        <hr className='my-7 w-[80%] mx-auto' />

        <div className='mt-5'>
          <input
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg' 
            type="text"
            name='section' 
            {...register('section')}
          />
          {errors.section && <p className='text-[#FF0000] text-xs'>{errors.section.message}</p>}

        </div>
        <div onClick={handleSubmit(changeSectionNameHandler)}>
          <YellowBlackBtn   colour={"Yellow"}>Save Change</YellowBlackBtn>
        </div>
      </div>
     </div>
    </div>
  )
}

export default ChangeSectionNameModal