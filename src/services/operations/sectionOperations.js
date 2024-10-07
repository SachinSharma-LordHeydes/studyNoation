import { apiConnector } from "../apiConnector"
import {courseEndpoints} from '../../services/api'
import { setSectionData, setSubSectionData } from "../../features/Courses/sectionSlice";


const {CREATE_SECTION_API,DELETE_SECTION_API,UPDATE_SECTION_API,CREATE_SUBSECTION_API}=courseEndpoints



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


// export function editSection(sectionName, id) {
//   return async (dispatch, getState) => {
//     try {
//       // Make the API call to update the section
//       const response=await apiConnector('POST',UPDATE_SECTION_API,{sectionName,id});
//       console.log("Edit Course Response => ", response);

//       // Ensure response.data contains updated section info
//       const updatedSection = response.data.data; // Adjust according to the API response

//       // Check that the updated section contains the necessary field
//       // if (!updatedSection || !updatedSection.sectionName) {
//       //   console.log("Error: API did not return updated sectionName.");
//       //   return;
//       // }

//       // Get the current state
//       const { sectionData } = getState().section;

//       // Update the specific section
//       const updatedSections = sectionData.courseContent.map((section) => {
//         if (section._id === id) {
//           return {
//             ...section,
//             sectionName: updatedSection.sectionName, // Use the updated sectionName
//           };
//         }
//         return section; // Keep the other sections unchanged
//       });

//       // Dispatch the updated state
//       dispatch(setSectionData({ ...sectionData, courseContent: updatedSections }));
//     } catch (error) {
//       console.log("Error Occurred while Editing Sections => ", error);
//     }
//   };
// }


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
      console.log("Create Course Response => ",response)
      dispatch(setSubSectionData(response.data.data))

    } catch (error) {
      console.log("Error Occured while Creating SubSections => ",error)
    }
  }
}