import React, { useEffect, useState } from 'react'
import DropzoneFileInput from '../../common/DropzoneFileInput'
import { RxCross2 } from "react-icons/rx";
import YellowBlackBtn from '../../HomePage/YellowBlackBtn';
import { RiArrowRightWideFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, setEditOrNextStatus } from '../../../features/profile/profileSlice';
import { useForm } from 'react-hook-form';
import { createCourse, editCourse, getCatagory, } from '../../../services/operations/courseOperation';
import { setThumbnailPreview } from '../../../features/Courses/coursesSlice';

function CourseInfo() {

  const [listRequirement,setListRequirement]=useState([])

  const {currentStep,editOrNextStatus}=useSelector((state)=>state.profile)
  const {catagory,courseDetails}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();



  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      thumbnail: null, // Add default value for thumbnail
    }
  });

  useEffect(()=>{
    console.log("currentStep and editOrNextStatus",currentStep,editOrNextStatus)
  })

  useEffect(() => {
    if (courseDetails) {
      // Pre-fill form fields when courseDetails is available
      setValue('courseName', courseDetails.courseName);
      setValue('courseDescp', courseDetails.courseDescp);
      setValue('price', courseDetails.price);
      setValue('catagory', courseDetails.catagoryName);
      setValue('courseTag', courseDetails.courseTag);
      setValue('whatWillYouLearn', courseDetails.whatWillYouLearn);

      console.log("CourseFetails => ",courseDetails)
      
      // Pre-fill requirements list if available
      if (courseDetails.requirement) {
        setListRequirement(courseDetails.requirement);
      }
      if (courseDetails.thumbnail) {
        dispatch(setThumbnailPreview(courseDetails.thumbnail));
      }
    }
  }, [courseDetails, setValue, dispatch]);

  // const onSubmit = (data) => {

  //   const formData = new FormData();
    
  //   formData.append('courseName', data.courseName);
  //   formData.append('courseDescp', data.courseDescp);
  //   formData.append('price', data.price);
  //   formData.append('catagory', data.catagory);
  //   formData.append('courseTag', data.courseTag);
  //   formData.append('whatWillYouLearn', data.whatWillYouLearn);
  //   formData.append('thumbnail', data.thumbnail || courseDetails?.thumbnail);
    
  //   if (courseDetails?.thumbnail) {
  //     console.log("Thumbnail is present");
  //     console.log("Thumbnail is present");
  //     // formData.append('thumbnail', courseDetails?.thumbnail);
  //   } else {
  //     console.log("Thumbnail is missing or not set correctly");
  //   }
    
  //   console.log("FormData contents:", Object.fromEntries(formData));
  //   // console.log("FormData contents 2=>:",formData);  //showing Empty object
  //   if(editOrNextStatus===1){
  //     console.log("Creating Course")
  //     dispatch(createCourse(formData,token))
  //   }else{
  //     console.log("Editing Course")
  //     const id=courseDetails?._id
  //     formData.append('id', id); 
  //     // dispatch(setEditOrNextStatus(editOrNextStatus - 1));
  //     dispatch(editCourse(Object.fromEntries(formData),token))
  //   }
  //   console.log("FormData from Course info pAge => ",formData)
  //   dispatch(setCurrentStep(currentStep + 1));
  // };


  // CourseInfo component form submission update
const onSubmit = (data) => {
  try {

    if (!data.thumbnail || !(data.thumbnail instanceof File)) {
      setError('thumbnail', {
        type: 'manual',
        message: 'Thumbnail is required',
      });
      return;  // Stop form submission if there's no thumbnail
    }

    if(editOrNextStatus === 1) {
      // Create new course - needs file upload
      const formData = new FormData();
      formData.append('courseName', data.courseName);
      formData.append('courseDescp', data.courseDescp);
      formData.append('price', data.price);
      formData.append('catagory', data.catagory);
      formData.append('courseTag', data.courseTag);
      formData.append('whatWillYouLearn', data.whatWillYouLearn);
      
      // For new course, append file directly
      if (data.thumbnail instanceof File) {
        formData.append('thumbnail', data.thumbnail);
      }else{
        setError('thumbnail', {
          type: 'manual',
          message: 'Thumbnail is Required',
        });
      }
      
      // if (!data.thumbnail) {
      //   setError('thumbnail', {
      //     type: 'manual',
      //     message: 'Thumbnail is Required',
      //   });
      // }
      
      console.log("Creating Course");
      dispatch(createCourse(formData, token));
    } else {
      // Edit existing course
      const courseData = {
        courseName: data.courseName,
        courseDescp: data.courseDescp,
        price: data.price,
        catagory: data.catagory,
        courseTag: data.courseTag,
        whatWillYouLearn: data.whatWillYouLearn,
        id: courseDetails._id,
      };

      // For edit, only append new thumbnail if it's changed
      if (data.thumbnail instanceof File) {
        const formData = new FormData();
        Object.keys(courseData).forEach(key => {
          formData.append(key, courseData[key]);
        });
        formData.append('thumbnail', data.thumbnail);
        dispatch(editCourse(formData, token));
      } else {
        // If thumbnail hasn't changed, send the existing URL
        courseData.thumbnail = courseDetails.thumbnail;
        dispatch(editCourse(courseData, token));
      }
    }
    
    dispatch(setCurrentStep(currentStep + 1));
  } catch (error) {
    console.error("Error in form submission:", error);
  }
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

  function handelGetCourses(){
    dispatch(getCatagory())
  }


  return (
    <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-9'>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="courseName">Course Title</label>
          <input 
            type="text" 
            name="courseName" 
            id="courseName"
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg '
            {...register('courseName',{ required: true })}
          />
          {errors.courseName && <p className='text-[#FF0000] text-xs'>Course Title is required *</p>}
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
          <label htmlFor="price">Course Price</label>
          <input 
            type="Number" 
            name="price" 
            id="price" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg pl-10 '
            {...register('price',{ required: true })}
          />
          {errors.price && <p className='text-[#FF0000] text-xs'>coursePrice is required *</p>}
          <span className='absolute top-9 left-4'>रू</span>
        </div>


        <div onClick={handelGetCourses} className='flex flex-col space-y-2'>
          <label htmlFor="catagory">Catagory</label>
          <div >
            <select 
              name='catagory'
              id='catagory'
              className='bg-richblack-600 rounded-md px-4 py-3 text-lg w-full'
              {...register('catagory',{ required: true })}
            >
              {
                catagory.map((element,index)=>(
                  <option key={index}>
                    {element.name}
                  </option>
                ))
              }
            </select>
          </div>
          {errors.catagory && <p className='text-[#FF0000] text-xs'>Catagory is required *</p>}
        </div>

        <div  className='flex flex-col space-y-2'>
          <label htmlFor="thumbnail">Course Thumbnail</label>
          <DropzoneFileInput courseDetails={courseDetails} register={register('thumbnail', { required: true })} setValue={setValue} />
          {errors.thumbnail && <p className='text-[#FF0000] text-xs'>Thumbnail is required *</p>}
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="whatWillYouLearn">Benefits of the course</label>
          <textarea 
            type="text" 
            name="whatWillYouLearn" 
            id="whatWillYouLearn" 
            className='bg-richblack-600 rounded-md px-4 py-2 text-lg min-h-[90px]'
            {...register('whatWillYouLearn',{ required: true })}
          />
          {errors.whatWillYouLearn && <p className='text-[#FF0000] text-xs'>Benefits of the course is required *</p>}
        </div>


        <div className=''>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="requirement">Tags</label>
            <input 
              type="text" 
              name="courseTag" 
              id="courseTag"
              className='bg-richblack-600 rounded-md px-4 py-2 text-lg '
              {...register('requirement',{ required:  !listRequirement.length })}
              />
              {errors.requirement && <p className='text-[#FF0000] text-xs'>Tags are required *</p>}
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