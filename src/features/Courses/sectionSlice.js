import { createSlice} from "@reduxjs/toolkit";

const initialState={
  sectionData:'',
  subSectionData:''
}

export const courseSlice=createSlice({
  name:'course',
  initialState,
  reducers:{
    setSectionData:(state,action)=>{
      state.sectionData=action.payload
    },
    setSubSectionData:(state,action)=>{
      state.subSectionData=action.payload
    },
  }
})


export const {setSectionData,setSubSectionData} = courseSlice.actions;

export default courseSlice.reducer;