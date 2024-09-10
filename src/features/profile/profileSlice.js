import { createSlice} from "@reduxjs/toolkit";


const initialState={
  currentStep:2,
}

export const profileSlice=createSlice({
  name:'profile',
  initialState,
  reducers:{
    setCurrentStep:(state,action)=>{
      state.currentStep=action.payload
    }
  }
})


export const {setCurrentStep} = profileSlice.actions;

export default profileSlice.reducer;