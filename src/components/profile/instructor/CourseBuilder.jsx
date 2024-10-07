import React, { useEffect, useState } from 'react'
import { MdAddCircleOutline } from "react-icons/md";
import YellowBlackBtn from '../../HomePage/YellowBlackBtn';
import { RiArrowRightWideFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { FaArrowUpShortWide } from "react-icons/fa6";
import { IoPencilOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { PiLineVerticalThin } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setChangeSectionNameModalState, setClickedCourseID, setClickedSectionID, setConfirmationDeleteModalStatus, setCurrentStep, setEditOrNextStatus, setModalState } from '../../../features/profile/profileSlice';
import { createSection, deleteSection, editSection, getSection } from '../../../services/operations/sectionOperations';
import ChangeSectionNameModal from '../../../page/ChangeSectionNameModal';
import AddLectureModal from '../../../page/AddLectureModal';
import ConformationModal from '../../../page/ConformationModal';



function CourseBuilder() {

  const {modalState,currentStep,editOrNextStatus,changeSectionNameModalState,confirmDeleteModalState}=useSelector((state)=>state.profile)
  const {sectionData,subSectionData}=useSelector((state)=>state.section)
  const {courseDetails}=useSelector((state)=>state.course)

  const [subSection,setSubSection]=useState(['Hii','My','Sub-Sections']);
  const [activeSection, setActiveSection] = useState(null);

  const dispatch=useDispatch();

  useEffect(()=>{
    console.log("SubsectionData Data=>",subSectionData)
  },[subSectionData])


  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm ();

  const clickCreateSection=(data)=>{
    console.log("create Section Data => ",data)
    const sectionName=data.section
    if(!sectionName ||sectionName.trim()===''){
      console.log("Name must be given to Section");
      setError("section",{
        type:"manual",
        message:'Cannot accept empty string as Section*'
      })
      return;
    }
    dispatch(createSection(data.section,courseDetails?._id))
    setValue('section','')
  }

  const toggleDropdown = (index) => {
    setActiveSection((prev) => (prev === index ? null : index)); // Toggle or close the active section
  };


  function setModal(){
    console.log("Modal State => ",!modalState)
    dispatch(setModalState(!modalState));
  }

  function goBack(){
    dispatch(setCurrentStep(currentStep - 1));
    dispatch(setEditOrNextStatus(editOrNextStatus - 1));
  }

  function clickToDeleteSection(index){
    console.log("Delete event=> ",sectionData.courseContent[index]._id,courseDetails?._id)

    dispatch(setClickedSectionID(sectionData.courseContent[index]._id))
    dispatch(setClickedCourseID(courseDetails?._id))

    dispatch(setConfirmationDeleteModalStatus(!confirmDeleteModalState))
    
    // dispatch(deleteSection(sectionData.courseContent[index]._id,courseDetails?._id))
  }

  function clickToEditSection(index){
    console.log("Index=>",index)
    dispatch(setClickedSectionID(sectionData.courseContent[index]._id))
    dispatch(setChangeSectionNameModalState(!changeSectionNameModalState))
  }


  return (
    <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
      <div>
        <div>
          <h1>Course Builder</h1>
        </div>
        <input 
          className='w-full bg-richblack-600 rounded-md px-4 py-2 text-lg mt-2' 
          type="text"
          name='section' 
          {...register('section')}
        />
        {errors.section && <p className='text-[#FF0000] text-xs'>{errors.section.message}</p>}
      </div>
      <div className='mt-5'>
        <div className='border border-yellow-25 border-dashed rounded-md flex items-center gap-x-2 py-2 px-3 w-fit hover:cursor-pointer'>
          <div><MdAddCircleOutline color='yellow' /></div>
          <div onClick={handleSubmit(clickCreateSection)} className='text-yellow-25'>Create Section</div>
        </div>
      </div>

      {
        sectionData.courseContent?(
          <div>
            <div className='w-full bg-richblack-700 rounded-md px-5 py-5 text-lg mt-10 '>
              <ul className=' '>
                {
                  sectionData.courseContent.map((element,index)=>(
                      <li key={index} className='text-md '>
                        <div>
                          <div className='flex justify-between text-richblack-200'>
                            <div className='flex items-center gap-2'>
                              <div><FaArrowUpShortWide /></div>
                              <div>{element.sectionName}</div>
                            </div>
                            <div className='flex gap-x-1'>
                              <button onClick={()=>clickToEditSection(index)} ><IoPencilOutline /></button>
                              <button onClick={()=>clickToDeleteSection(index)}><MdDelete /></button>
                              <div className='mr-1 ml-1'><PiLineVerticalThin /></div>
                              <div onClick={() => toggleDropdown(index)} className='hover:cursor-pointer'>
                                  <FaCaretDown/>
                              </div>
                            </div>
                          </div>


                          <div>
                            {
                              activeSection === index &&
                              subSectionData.courseContent.map((element,index)=>(
                                <div key={index} className='w-[85%] mx-auto  '>

                                  <hr className='mt-3 mb-3 text-richblack-600 w-[95%] mx-auto' />

                                  <div className='flex justify-between text-sm text-richblack-200'>
                                    <div>{element.title}</div>
                                    <div className='flex gap-x-1'>
                                      <button><IoPencilOutline /></button>
                                      <button><MdDelete /></button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          
                          <div>
                            {
                              activeSection === index && (
                                <div onClick={setModal} className='flex items-center mt-3 mb-3 text-md gap-x-1 '>
                                  <div className='hover:cursor-pointer'><FaPlus color='Yellow' size={10}/></div>
                                  <div onClick={()=>dispatch(setClickedSectionID(sectionData.courseContent[index]._id))} className='text-yellow-25 hover:cursor-pointer text-md'>Add Lecture</div>
                                </div>
                              )
                            }
                          </div>

                          {
                            index<sectionData.courseContent.length-1?
                              (
                                <div>
                                  <hr className='mt-5 mb-5 text-richblack-400 w-[95%] mx-auto' />
                                </div>
                              ):
                              (
                                <div>
                                  
                                </div>
                              )
                          }

                        </div>
                      </li>
                  ))
                }
              </ul>
            </div>
          </div>
        ):
        (
          <div>
          </div>
        )
      }

      
      <div>
        <div className='flex justify-end gap-x-7'>
          <div onClick={goBack}><YellowBlackBtn>Back</YellowBlackBtn></div>
          <div onClick={()=>dispatch(setCurrentStep(currentStep + 1))}>
            <YellowBlackBtn colour={"Yellow"}>Next <RiArrowRightWideFill /></YellowBlackBtn>
          </div>
        </div>
      </div>

      <div>
        {changeSectionNameModalState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
            {changeSectionNameModalState && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
                <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
                  <ChangeSectionNameModal></ChangeSectionNameModal>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {confirmDeleteModalState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
            {confirmDeleteModalState && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
                <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
                  <ConformationModal></ConformationModal>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {modalState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
            {modalState && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
                <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
                  <AddLectureModal></AddLectureModal>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default CourseBuilder