
import axios from 'axios';

export const apiConnector = async (method, url, bodydata, headers = {}, params) => {
  try {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const token = userData?.token;
    console.log("Token:", token);
    
    const config = {
      method: method,
      url: url,
      data: bodydata ? bodydata : null,
      headers: {
        ...headers,  // Merge with any headers you pass
        Authorization: token ? `Bearer ${token}` : '',  // Set the Authorization header
      },
      params: params ? params : null,
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("API Connector Error:", error);
    throw error;
  }
};
