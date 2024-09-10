import React, { useState } from 'react'
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



function CourseBuilder() {

  const [section,setSection]=useState(['hii','My','Love']);
  const [down,setDown]=useState(false);


  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm ();

  function handelClickForDown(){
    setDown(!down)
  }

  return (
    <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
      <div>
        <div>
          <h1>Course Builder</h1>
        </div>
        <input className='w-full bg-richblack-600 rounded-md px-4 py-2 text-lg mt-2' type="text" />
      </div>
      <div className='mt-5'>
        <div className='border border-yellow-25 border-dashed rounded-md flex items-center gap-x-2 py-2 px-3 w-fit hover:cursor-pointer'>
          <div><MdAddCircleOutline color='yellow' /></div>
          <div className='text-yellow-25'>Create Section</div>
        </div>
      </div>

      <div className='w-full bg-richblack-600 rounded-md px-5 py-2 text-lg mt-10 '>
        <ul className='list-disc pl-3 '>
          {
            section.map((element,index)=>(
                <li className='text-md '>
                  <div>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <div><FaArrowUpShortWide /></div>
                        <div>{element}</div>
                      </div>
                      <div className='flex gap-x-1'>
                        <div><IoPencilOutline /></div>
                        <div><MdDelete /></div>
                        <div className='mr-1 ml-1'><PiLineVerticalThin /></div>
                        <div onClick={handelClickForDown} className='hover:cursor-pointer'>
                            <FaCaretDown/>
                        </div>
                      </div>
                    </div>
                    <hr className='mt-5 mb-2 text-richblack-200' />
                    <div>
                      {
                        down?
                        (
                          <div>

                            <div className='flex items-center w-[95%] mx-auto mt-3 mb-3 text-sm gap-x-1'>
                              <div><FaPlus color='Yellow' /></div>
                              <div className='text-yellow-25'>Add Lecture</div>
                            </div>
                          </div>
                        ):
                        (
                          <div>

                          </div>
                        )
                      }
                    </div>
                  </div>
                </li>
            ))
          }
        </ul>
      </div>


      <div>
        <div className='flex justify-end gap-x-7'>
          <div><YellowBlackBtn>Back</YellowBlackBtn></div>
          <div><YellowBlackBtn colour={"Yellow"}>Next <RiArrowRightWideFill /></YellowBlackBtn></div>
        </div>
      </div>
    </div>
  )
}

export default CourseBuilder