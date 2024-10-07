const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");
const subSectionModel = require("../Models/subSectionModel");
const { uploadFiles } = require("../utils/fileUploader");

require("dotenv").config();


// exports.createSubSection=async(req,res)=> {
  
//   try {
//     // console.log("request Body => ",req.body)
//     const {title,timeDuration,description,id}=req.body;
//     // console.log("Req.FIles => ",req.files)
//     id=id.replace(":","");
//     const {videoURL}=req.files;

//     if(!title || !timeDuration || !description || !videoURL){
//       return req.ststus(403).json({
//         success:false,
//         message:`All fields are requires to create Subsections`
//       });
//     }

//     const videoUploaded=await uploadFiles(videoURL,process.env.FOLDER_NAME);

//     const newSubSection=await subSectionModel.create(
//       {
//         title,
//         timeDuration,
//         description,
//         videoURL:videoUploaded.secure_url
//       }
//     );

//     console.log("New SubSection Data => ",newSubSection)

//     const updatedSection=await sectionModel.findOneAndUpdate(
//       {id},
//       {
//         subSection:newSubSection._id
//       }
//     )


//     return res.status(200).json({
//       success:true,
//       message:`SuccessFully Create SubSection`,
//       data:updatedSection
//     })


//   } catch (error) {
//     return res.status(500).json({
//       success:false,
//       message:`Unable to Create SubSection because of ERROR => ${error}`
//     })
//   }


// }





// exports.createSubSectionHandler = async (req, res) => {
//   try {
//     console.log("Req => ", req.body);
//     console.log("Request Params => ", req.files);

//     const { title, description, video, id,courseId } = req.body;
//     const validObjectId = id.replace(':', '');

//     if (!title || !id) {
//       return res.status(403).json({
//         success: false,
//         message: "Required fields are missing"
//       });
//     }

//     // Assuming you're uploading the video and it returns a URL:
//     const videoURL = video.path;  // Extract the path from the video object.

//     // Create the sub-section with the correct videoURL string
//     const newSubSection = await subSectionModel.create({
//       title,
//       description,
//       videoURL  // This should now be the correct URL string
//     });

//     // Update the section to include the new sub-section
//     const updatedSection = await sectionModel.findByIdAndUpdate(
//       validObjectId,
//       {
//         $push: {
//           subSection: newSubSection._id
//         }
//       },
//       { new: true }
//     ).populate("subSection");

//     const updatedcourse = await courseModel.findByIdAndUpdate(
//       courseId,
//       {
//         $push: {
//           courseContent: updatedSection._id
//         }
//       },
//       { new: true }
//     ).populate("courseContent");

//     return res.status(200).json({
//       success: true,
//       message: "Sub-Section Created Successfully",
//       data: updatedcourse
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: `Unable to create Sub-Section`,
//       error
//     });
//   }
// };

// const courseModel = require("../Models/courseModel");
// const sectionModel = require("../Models/sectionModel");
// const subSectionModel = require("../Models/subSectionModel");

exports.createSubSectionHandler = async (req, res) => {
  try {
    const { title, description, video, id, courseId } = req.body;

    // Make sure id is valid
    const validObjectId = id.replace(':', '');

    if (!title || !id) {
      return res.status(403).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    // Assuming you're uploading the video and it returns a URL:
    const videoURL = video.path;  // Extract the path from the video object.

    // Create the sub-section with the correct videoURL string
    const newSubSection = await subSectionModel.create({
      title,
      description,
      videoURL  // This should now be the correct URL string
    });

    // Update the section to include the new sub-section
    const updatedSection = await sectionModel.findByIdAndUpdate(
      validObjectId,
      {
        $push: {
          subSection: newSubSection._id
        }
      },
      { new: true }
    )
    .populate({
      path: 'subSection',  // Populate subSection with details
      select: 'title description videoURL'  // Select only the needed fields
    });

    // Update the course to include the updated section
    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: updatedSection._id
        }
      },
      { new: true }
    )
    .populate({
      path: 'courseContent',  // Populate courseContent with section details
      populate: {
        path: 'subSection',  // Also populate the subSection details within each section
        model: subSectionModel,
        select: 'title description videoURL'
      }
    });

    return res.status(200).json({
      success: true,
      message: "Sub-Section Created Successfully",
      data: updatedCourse  // Now includes all populated details
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to create Sub-Section`,
      error
    });
  }
};




exports.updateSubSection=async(req,res)=>{
  try {

    const {subSectionName,description,id}=req.body;
    if(!subSectionName || !id){
      return res.status(403).json({
        success:true,
        message:`Section Name and Id of The User is Not Present`
      })
    }

    const updatedSubSection= await subSectionModel.findByIdAndUpdate(
      id,
      {
        subSectionName,description
      },
      {new:true}
    )

    const updatedSection=await sectionModel.findOne(
      {courseContent:id},
      { new: true } // to return the updated document
    ).populate("courseContent");

    return res.status(200).json({
      success:true,
      message:"SubSection Updated Successfully",
      data:updatedSection
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Update SubSection because of ERROR`,
      error:error
    })
  }
}



exports.deleteSubSection=async(req,res)=>{
  try {

    const {id,courseId}=req.body;

    console.log("Section ID: ", id);
    console.log("Course ID: ", courseId);

    if(!id){
      return res.status(403).json({
        success:true,
        message:`Section Name and Id of The User is Not Present`
      })
    }


    const deletedSection = await sectionModel.findByIdAndDelete(id);
    
    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }


    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: id
        }
      },
      { new: true }
    ).populate('courseContent');

    return res.status(200).json({
      success:true,
      message:"Section Deleted Successfully",
      data:updatedCourse
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to delete Section because of ERROR`,
      error:error
    })
  }
}