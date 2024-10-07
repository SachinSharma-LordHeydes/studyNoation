import { createSlice} from "@reduxjs/toolkit";


const initialState={
  catagory:[],
  courseData: {
    courseName: '',
    courseDescp: '',
    price: '',
    catagory: '',
    courseTag: '',
    whatWillYouLearn: '',
    thumbnail: null,
    requirement: [],
    _id:null
  },
  thumbnailPreview: null,
  courseDetails: null,
}

export const courseSlice=createSlice({
  name:'course',
  initialState,
  reducers:{
    setCatagory:(state,action)=>{
      state.catagory=action.payload
    },
    setCourseData: (state, action) => {
      state.courseData = { ...state.courseData, ...action.payload };
    },
    setThumbnailPreview: (state, action) => {
      state.thumbnailPreview = action.payload;
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    }
  }
})


export const {setCatagory,setCourseData,setThumbnailPreview,setCourseID,setCourseDetails} = courseSlice.actions;

export default courseSlice.reducer;