import { setLoading, setOtp , setStatus , setData, removeData} from "../../features/auth/authSlice";
import { endpoints } from "../api"
import { apiConnector } from "../apiConnector"


const {SENDOTP_API , SIGNUP_API , LOGIN_API , RESETPASSWORD_API , SENDRESETPASSMAIL_API }=endpoints

export function sendOtp(email){
  return async(dispatch)=>{
    try {
      const response=await apiConnector("POST",SENDOTP_API,{email});
      console.log("Send OTP to Response => ",response)
      const otpSent=response.data.data.otp

      dispatch(setOtp(otpSent));


    } catch (error) {
      console.log("Error while sending OTP => ",error)
    }
  }
}

export function resetPassword(data){
  return async(dispatch)=>{
    try {
      const {token,password,confirmPassword}=data
      const response=await apiConnector("POST",RESETPASSWORD_API,{token,password,confirmPassword});
      console.log("Reset Password Response => ",response.data.success)
      dispatch(setStatus(true))

    } catch (error) {
      console.log("Error while sending OTP => ",error)
      dispatch(setStatus(false))
    }
  }
}


export function sendResetPasswordMail(email){
  return async(dispatch)=>{
    try {
      const response=await apiConnector("POST",SENDRESETPASSMAIL_API,{email});
      console.log("Reset Password Mail Response => ",response)


    } catch (error) {
      console.log("Error while sending OTP => ",error)
      dispatch(setStatus(false))
    }
  }
}




export function signUp(signUpData,navigate){
  return async(dispatch)=>{
    try {
      dispatch(setLoading(true))
      const{firstName,lastName,email,password,confirmPassword,accountType,otp}=signUpData
      
      const response=await apiConnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp});

      const image=response.data.data.image;
      console.log("SignUp operation resposne => ",image)

      if(response.data.success){
        dispatch(setData(image))
        navigate('/Login')
      }else{
        console.log('Invalid OTP')
      }

    } catch (error) {
      console.log("Error Occured While Signing IN => ",error)
    }
    dispatch(setLoading(false))
  }
}


export function login(signUpData,navigate){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try {
      const{email,password}=signUpData

      const response=await apiConnector("POST",LOGIN_API,{email,password})

      
      const userData={
        token:response.data.token,
        firstName:response.data.userExist.firstName,
        lastName:response.data.userExist.lastName,
        email:response.data.userExist.email,
        accountType:response.data.userExist.accountType,
        imageURL:response.data.userExist.image,
        description:response.data.addDetail.about,
        gender:response.data.addDetail.gender,
        contact:response.data.addDetail.contactNum,
        DOB:response.data.addDetail.DOB,  
      }
      
      console.log("Login reponse => ",response)
      if(response.data.success){
        dispatch(setData(userData))
        navigate('/dashboard/my-profile')
      }else{
        console.log('Invalid OTP')
      }

    } catch (error) {
      console.log("Error Occured While LOGGIN => ",error)
    }
    dispatch(setLoading(false))
  }
}




export function logOut(navigate){
  return async(dispatch)=>{
    console.log("Token set to null")
    dispatch(removeData());
    navigate('/Login')
  }
}