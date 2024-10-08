import { apiConnector } from "../apiConnector"
import {courseEndpoints} from '../../services/api'
import { setSectionData, setSubSectionData } from "../../features/Courses/sectionSlice";


const {CREATE_SECTION_API,DELETE_SECTION_API,UPDATE_SECTION_API,CREATE_SUBSECTION_API,DELETE_SUBSECTION_API,GET_SUBSECTION_API}=courseEndpoints



export function editSection(sectionName,id){
  return async(dispatch)=>{
    try {
      const response=await apiConnector('POST',UPDATE_SECTION_API,{sectionName,id});
      console.log("Edit Course Response => ",response)
      dispatch(setSectionData(response.data.data))
    } catch (error) {
      console.log("Error Occured while Editing Sections => ",error)
    }
  }
}



export function createSection(sectionName,id){
  return async(dispatch)=>{
    try {
      const response=await apiConnector('POST',CREATE_SECTION_API,{sectionName,id});
      console.log("Create Course Response => ",response)
      dispatch(setSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while Creating Sections => ",error)
    }
  }
}

 
export function deleteSection(id,courseId){
  return async(dispatch)=>{
    try {
      const response=await apiConnector('DELETE',DELETE_SECTION_API,{id,courseId});
      console.log("Delete Section Response => ",response)
      dispatch(setSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while Deleting Sections => ",error)
    }
  }
}



//--------------------------------------------

export function createSubSection(formData){
  return async(dispatch)=>{
    try {
      const{title,description,video,id}=formData
      console.log("SubSection Form Data=>",title,description,video,id)
      const response=await apiConnector('POST',CREATE_SUBSECTION_API,formData,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Create SubSection Response => ",response)
      dispatch(setSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while Creating SubSections => ",error)
    }
  }
}

export function deleteSubSection(clickedCourseID,clickedSectionID,clickedSubSectionID){
  return async(dispatch)=>{
    try {
      const id=clickedSubSectionID
      const courseId=clickedCourseID
      const sectionId=clickedSectionID

      console.log("SubSection Form Data=>",clickedCourseID,clickedSectionID,clickedSubSectionID)
      const response=await apiConnector('POST',DELETE_SUBSECTION_API,{id, courseId, sectionId});
      console.log("Create SubSection Response => ",response)
      dispatch(setSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while deleting SubSections => ",error)
    }
  }
}


export function updateSubSection(formData){
  return async(dispatch)=>{
    try {
      const{title,description,video,id}=formData
      console.log("SubSection Form Data=>",title,description,video,id)
      const response=await apiConnector('POST',CREATE_SUBSECTION_API,formData,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Create SubSection Response => ",response)
      dispatch(setSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while Creating SubSections => ",error)
    }
  }
}

export function getSubSectionData(id){
  return async(dispatch)=>{
    try {
      console.log("SubSection Form Data=>",id)
      const response=await apiConnector('POST',GET_SUBSECTION_API,{id});
      if(!response){
        console.log("Error Occured while Fetching SubSectionsata");
        return;
      }
      console.log("Fetching SubSection Response => ",response)
      dispatch(setSubSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while Fetching SubSectionsata => ",error)
    }
  }
}
