// import axios from "axios";


// export const axiosInstance=axios.create({});
// export const apiConnector=async (method,url,bodydata,headers,params)=>({
//   try {
//     const config={
//       method:`${method}`,
//       url:`${url}`,
//       data:bodydata?bodydata:null,
//       headers:headers?headers:null,
//       params:params?params:null,
//     }
//   } catch (error) {
    
//   }
// })      


// services/apiConnector.js
import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodydata, headers, params) => {
  try {
    const config = {
      method:`${method}`,
      url:`${url}`,
      data:bodydata?bodydata:null,
      headers:headers?headers:null,
      params:params?params:null,
    };
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
      console.error("API Connector Error:", error);
    throw error;
  }
};
