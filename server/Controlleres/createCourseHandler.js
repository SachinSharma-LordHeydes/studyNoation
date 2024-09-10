const userModel = require("../Models/userModel");
const courseModel = require("../Models/courseModel");
const catagoryModel = require("../Models/catagoryModel");
const { uploadFiles } = require("../utils/fileUploader");





exports.createCourseHandler=async(req,res)=>{
  try {
    const{courseName,courseDescp,whatWillYouLearn,price,catagory}=req.body;

    const thumbnail=req.files.thumbnailImage

    console.log("ThumbNail => ",thumbnail.name)

    if(!courseName || !courseDescp || !whatWillYouLearn || !price || !thumbnail || !catagory){
      return res.status(403).json({
        success:false,
        message:"All fields Are required"
      });
    }

    // console.log("req => ",req.user.id)
    const userId=req.user.id;

    const instructorDetail=await userModel.findById({_id:userId});
    console.log("Insrtructor Derails => ",instructorDetail)
    if(!instructorDetail){
      return res.status(403).json({
        success:false,
        message:"Instructor not found"
      })
    }

    const catagoryDetail=await catagoryModel.findOne({name:catagory});
    if(!catagoryDetail){
      return res.status(403).json({
        success:false,
        message:"Catagory not found"
      })
    }

    const thumbnailResponse=await uploadFiles(thumbnail,process.env.FOLDER_NAME)
    console.log("Thumbnail=> ",thumbnailResponse)

    const newCourse=await courseModel.create({
      courseName,
      courseDescp,
      whatWillYouLearn,
      catagory:catagoryDetail._id,
      instructor:instructorDetail._id,
      price
      // thumbnail:thumbnailImage.secure_url
    })

    const updatedUser = await userModel.findByIdAndUpdate(
      instructorDetail._id,
      {
        $push: { courses: newCourse._id }
      },
      { new: true }
    );

    console.log("updated User=> ",updatedUser)

    return res.status(200).json({
      success:true,
      message:`Course created Successsfully => ${newCourse}`
    })

  } catch (error) {
    return res.status(403).json({
      success:false,
      message:`Something went weong while creating Courses ERROE => ${error}`
    });
  }

}




exports.showAllCourses=async(req,res)=>{
  try {
    const allCourses=await courseModel.findOne({})
    return res.status(200).json({
      success:true,
      message:`All course fetched successFully ${allCourses}`,
      data:allCourses
    })
  } catch (error) {
    return res.status(403).json({
      success:false,
      message:`Unable to ferch the data of all courses due to error => ${error}`
    })
  }
}