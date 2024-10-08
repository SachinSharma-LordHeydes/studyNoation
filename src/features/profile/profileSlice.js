import { createSlice} from "@reduxjs/toolkit";


const initialState={
  currentStep:1,
  modalState:false,
  changeSectionNameModalState:false,
  confirmDeleteModalState:false,
  toDelete:'',
  editOrNextStatus:1, //Next=>1 edit=>0
  clickedCourseID:null,
  clickedSectionID:null,
  clickedSubSectionID:null,
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
    setClickedCourseID:(state,action)=>{
      state.clickedCourseID=action.payload
    },
    setClickedSectionID:(state,action)=>{
      state.clickedSectionID=action.payload
    },
    setClickedSubSectionID:(state,action)=>{
      state.clickedSubSectionID=action.payload
    },
    setConfirmationDeleteModalStatus:(state,action)=>{
      state.confirmDeleteModalState=action.payload
    },
    setToDelete:(state,action)=>{
      //-----------To Check
      state.toDelete=action.payload
    },
  }
})


export const {setCurrentStep,setModalState,setChangeSectionNameModalState,setEditOrNextStatus,setClickedSectionID,setClickedCourseID,setClickedSubSectionID,setConfirmationDeleteModalStatus,setToDelete} = profileSlice.actions;

export default profileSlice.reducer;