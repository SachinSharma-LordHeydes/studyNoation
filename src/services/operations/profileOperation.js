import { apiConnector } from "../apiConnector"
import {settingsEndpoints} from '../api'
import { removeData, setData } from "../../features/auth/authSlice";


const {UPDATE_PROFILE_API,UPDATE_PROFILE_PICTURE_API,DELETE_PROFILE_API}=settingsEndpoints


export function updateProfilePicture(formData) {
  return async(dispatch) => {
    try {
      console.log('Form Data => ',formData)
      const response = await apiConnector('POST', UPDATE_PROFILE_PICTURE_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log("Profile Operation response => ", response.data.data.image);
      
      if (response.data.success) {

        const imageURL = response.data.data.image;
        dispatch(setData({
          ...response.data,
          imageURL: imageURL 
        }));
      }
      
      return response.data;
    } catch (error) {
      console.log("Error occurred while Updating Profile => ", error);
    }
  }
}

export function updateProfile(data,token,navigate){
  return async(dispatch)=>{
    try {

      const{ gender, DOB, description, contactNum, firstName, lastName,}=data

      console.log("Data => ",data)
      const response =await apiConnector("POST",UPDATE_PROFILE_API,{ gender, DOB, description, contactNum, firstName, lastName,token});

      console.log("Prodile Update response => ",response)

      if (response.data.success) {

        // console.log("Updated Data => ",updatedData)

        dispatch(setData(
          {
            ...response.data.data1,
            ...response.data.data2,
            firstName,
            lastName,
            gender,
            DOB,
            description,
            contact:contactNum
          }
        ));

        navigate('/dashboard/my-profile')

      }

      return response.data;

    } catch (error) {
      console.log("Error occured While Updating Profile details => ",error)
    }
  }
}


export function deleteAccount(token,navigate){
  return async(dispatch)=>{
    try {
      console.log("Token Frontend => ",token)
      const response =await apiConnector('DELETE',DELETE_PROFILE_API,{token});
      console.log("Delete Profile response => ",response);
      navigate('/')
      dispatch(removeData())


    } catch (error) {
      console.log("Error Occured While Deleteing Account => ",error)
    }
  }
}

