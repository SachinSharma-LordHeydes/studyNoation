import { apiConnector } from "../apiConnector"
import {courseEndpoints} from '../../services/api'
import { setCatagory, setCourseDetails, setThumbnailPreview } from "../../features/Courses/coursesSlice";


const {COURSE_CATEGORIES_API,CREATE_COURSE_API,COURSE_DETAILS_API,EDIT_COURSE_API}=courseEndpoints



export function getCatagory(){
  return async(dispatch)=>{
    try {
      const response=await apiConnector('GET',COURSE_CATEGORIES_API);
      console.log("Get Course Response => ",response)
      const catagory=response.data.allCatagories;

      dispatch(setCatagory(catagory))

    } catch (error) {
      console.log("Error Occured while fetching Catagory => ",error)
    }
  }
}


export function createCourse(formData,token){
  return async(dispatch)=>{
    try {
      console.log("Create course Form data => ",formData)
      console.log("Received FormData in createCourse:", Object.fromEntries(formData));

      const response=await apiConnector("POST",CREATE_COURSE_API,formData, {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })

      console.log("Create Course Responese => ",response.data.data.thumbnail)
      
      
      if (response) {
        dispatch(setCourseDetails(response.data.data));
        dispatch(setThumbnailPreview(response.data.data.thumbnail));
      }


    } catch (error) {
      console.log("Error while creating course => ",error)
    }
  }
}

export function getCourseDetails(courseId){
  return async(dispatch)=>{
    try {

      const response=await apiConnector("GET",COURSE_DETAILS_API,courseId)

      console.log("Get Course Responese => ",response)

      if (response) {
        dispatch(setThumbnailPreview(response.data.data.thumbnail));
      }

    } catch (error) {
      console.log("Error while fetchin course Details => ",error)
    }
  }
}


export function editCourse(formData,token){
  return async(dispatch)=>{
    try {

      console.log("Form Data to edit course => ",formData)

      const response=await apiConnector("POST",EDIT_COURSE_API,formData,{
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })

      console.log("Get edit Course Responese => ",response)

      if (response) {
        dispatch(setThumbnailPreview(response.data.data.thumbnail));
        dispatch(setCourseDetails(response.data.data));
      }

    } catch (error) {
      console.log("Error while editing course Details => ",error)
    }
  }
}