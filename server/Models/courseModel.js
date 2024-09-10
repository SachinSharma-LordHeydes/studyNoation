const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema(
  {
    courseName:{
      type:String,
      required:true
    },
    courseDescp:{
      type:String,
      required:true
    },
    instructor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userModel",
      required:true,
    },
    whatWillYouLearn:{
      type:String,
      required:true
    },
    courseContent:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"sectionModel"
    },
    ratingAndRview:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"ratingAndReviewModel"
    },
    price:{
      type:Number,
      required:true
    },
    thumbnail:{
      type:String,
      // required:true
    },
    catagory:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"catagoryModel",
    },
    studentEnrolled:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userModel",
    },
  }
);


module.exports=mongoose.model('courseModel',courseSchema);