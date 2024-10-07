const userModel = require("../Models/userModel");
const courseModel = require("../Models/courseModel");
const catagoryModel = require("../Models/catagoryModel");
const { uploadFiles } = require("../utils/fileUploader");

exports.createCourseHandler = async (req, res) => {
  try {
    const { courseName, courseDescp, whatWillYouLearn, price, catagory, courseTag } = req.body;
    
    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file is required"
      });
    }

    const thumbnail = req.files.thumbnail;

    if (!courseName || !courseDescp || !whatWillYouLearn || !price || !thumbnail || !catagory) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const userId = req.user.id;

    const instructorDetail = await userModel.findById(userId);
    if (!instructorDetail) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found"
      });
    }

    const catagoryDetail = await catagoryModel.findOne({ name: catagory });
    if (!catagoryDetail) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const thumbnailResponse = await uploadFiles(thumbnail, process.env.FOLDER_NAME);
    if (!thumbnailResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Error uploading thumbnail",
        error: thumbnailResponse.message
      });
    }

    const newCourse = await courseModel.create({
      courseName,
      courseDescp,
      whatWillYouLearn,
      catagory: catagoryDetail._id,
      catagoryName: catagoryDetail.name,
      instructor: instructorDetail._id,
      price,
      thumbnail: thumbnailResponse.data.secure_url
    });

    const updatedUser = await userModel.findByIdAndUpdate(
      instructorDetail._id,
      {
        $push: { courses: newCourse._id }
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse
    });

  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the course",
      error: error.message
    });
  }
};



// exports.editCOurseHandler=async(req,res)=>{
//   try {

//     console.log("edit course BODY request=>",req.body)
//     console.log("edit course FILES request=>",req?.files)

//     const { courseName, courseDescp, whatWillYouLearn, price, catagory, courseTag , id ,thumbnail } = req.body;



//     // if(!id){
//     //   return res.status(500).json({
//     //     success:false,
//     //     message:"Course ID not Found"
//     //   })
//     // }
    
//     if (!req.files.thumbnail || !thumbnail) {
//       return res.status(400).json({
//         success: false,
//         message: "Thumbnail file is required"
//       });
//     }

//     const thumbnailRec = req.files.thumbnail;

//     if (!courseName || !courseDescp || !whatWillYouLearn || !price || !catagory) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     const userId = req.user.id;

//     const instructorDetail = await userModel.findById(userId);
//     if (!instructorDetail) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor not found"
//       });
//     }

//     const catagoryDetail = await catagoryModel.findOne({ name: catagory });
//     if (!catagoryDetail) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found"
//       });
//     }

//     let thumbnailResponse;
//     if(!thumbnail){
//       thumbnailResponse = await uploadFiles(thumbnailRec, process.env.FOLDER_NAME);
//       if (!thumbnailResponse.success) {
//         return res.status(400).json({
//           success: false,
//           message: "Error uploading thumbnail",
//           error: thumbnailResponse.message
//         });
//       }
//     }

//     const newCourse = await courseModel.findByIdAndUpdate(id,{
//       courseName,
//       courseDescp,
//       whatWillYouLearn,
//       catagory: catagoryDetail._id,
//       catagoryName: catagoryDetail.name,
//       instructor: instructorDetail._id,
//       price,
//       thumbnail: thumbnail || thumbnailResponse?.data?.secure_url
//     },{new:true});

//     const updatedUser = await userModel.findByIdAndUpdate(
//       instructorDetail._id,
//       {
//         $push: { courses: newCourse._id }
//       },
//       { new: true }
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Course edited successfully",
//       data: newCourse
//     });
    
//   } catch (error) {
//       console.error("Error while Editing course:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong while editing the course",
//         error: error.message
//       });
//   }
// }


exports.editCourseHandler = async (req, res) => {
  try {
    console.log("edit course BODY request=>", req.body);
    console.log("edit course FILES request=>", req?.files);

    const { courseName, courseDescp, whatWillYouLearn, price, catagory, courseTag, id } = req.body;
    let thumbnail = req.body.thumbnail;

    if (!courseName || !courseDescp || !whatWillYouLearn || !price || !catagory || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const userId = req.user.id;

    const instructorDetail = await userModel.findById(userId);
    if (!instructorDetail) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found"
      });
    }

    const catagoryDetail = await catagoryModel.findOne({ name: catagory });
    if (!catagoryDetail) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Handle new thumbnail upload if provided
    if (req.files && req.files.thumbnail) {
      const thumbnailResponse = await uploadFiles(req.files.thumbnail, process.env.FOLDER_NAME);
      if (!thumbnailResponse.success) {
        return res.status(400).json({
          success: false,
          message: "Error uploading thumbnail",
          error: thumbnailResponse.message
        });
      }
      thumbnail = thumbnailResponse.data.secure_url;
    }

    // Update course with new data
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      {
        courseName,
        courseDescp,
        whatWillYouLearn,
        catagory: catagoryDetail._id,
        catagoryName: catagoryDetail.name,
        instructor: instructorDetail._id,
        price,
        thumbnail
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course edited successfully",
      data: updatedCourse
    });
    
  } catch (error) {
    console.error("Error while Editing course:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while editing the course",
      error: error.message
    });
  }
};




exports.getCourseDetails=async(req,res)=>{
  try {
    console.log(" getCourseDetails Request.body => ",req.body)
    const id=req.body.coursrID
    const courseDetails=await courseModel.findById({_id:id})
    return res.status(200).json({
      success:true,
      message:`All course fetched successFully `,
      // data:req.body,
      data:courseDetails
    })
  } catch (error) {
    return res.status(403).json({
      success:false,
      message:`Unable to ferch the data of all courses due to error `,
      error:error,
      error1:error.message
    })
  }
}