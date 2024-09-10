import { categories } from '../../services/api';
import { apiConnector } from '../apiConnector';

const {CATEGORIES_API}=categories

export const getCatagoty=async()=>{
  let result=[];
  try {
    // console.log("catagiry => " ,catagories )
    // console.log("catagiry API => " ,CATAGORY_API )
    const response=await apiConnector('GET',CATEGORIES_API)
    console.log('Catagory Response => ',response?.data?.allCatagories);
    result=response?.data?.allCatagories;
  } catch (error) {
    console.log("Error while Fetching catagory => ",error)
  }
  return result;
}