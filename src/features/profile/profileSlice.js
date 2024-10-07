import { createSlice} from "@reduxjs/toolkit";


const initialState={
  currentStep:1,
  modalState:false,
  changeSectionNameModalState:false,
  confirmDeleteModalState:false,
  editOrNextStatus:1, //Next=>1 edit=>0
  clickedSectionID:null,
  clickedCourseID:null
}

export const profileSlice=createSlice({
  name:'profile',
  initialState,
  reducers:{
    setCurrentStep:(state,action)=>{
      state.currentStep=action.payload
    },
    setChangeSectionNameModalState:(state,action)=>{
      state.changeSectionNameModalState=action.payload
    },
    setModalState:(state,action)=>{
      state.modalState=action.payload
    },
    setEditOrNextStatus:(state,action)=>{
      state.editOrNextStatus=action.payload
    },
    setClickedSectionID:(state,action)=>{
      state.clickedSectionID=action.payload
    },
    setClickedCourseID:(state,action)=>{
      state.clickedCourseID=action.payload
    },
    setConfirmationDeleteModalStatus:(state,action)=>{
      state.confirmDeleteModalState=action.payload
    },
  }
})


export const {setCurrentStep,setModalState,setChangeSectionNameModalState,setEditOrNextStatus,setClickedSectionID,setClickedCourseID,setConfirmationDeleteModalStatus} = profileSlice.actions;

export default profileSlice.reducer;