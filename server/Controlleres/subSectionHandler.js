const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");
const subSectionModel = require("../Models/subSectionModel");
const { uploadFiles } = require("../utils/fileUploader");

require("dotenv").config();



exports.createSubSectionHandler = async (req, res) => {
  try {
    const { title, description, video, id, courseId } = req.body;

    const validObjectId = id.replace(':', '');

    if (!title || !id) {
      return res.status(403).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    const videoURL = video.path;  

    const newSubSection = await subSectionModel.create({
      title,
      description,
      videoURL  // This should now be the correct URL string
    });

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


    const updatedCourse = await courseModel.findById(courseId).populate({
      path: 'courseContent', // Populate courseContent which contains sectionModel data
      populate: {
        path: 'subSection', // Inside each section, populate subSection which contains subSectionModel data
        select: 'title description videoURL' // Select specific fields from subSection
      }
    })

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




exports.getSubSectionHandler=async(req,res)=>{
  try {

    const {id}=req.body;
    console.log("get subsection req.bofy=> ",req.body)
    if(!id){
      return res.status(403).json({
        success:true,
        message:`Id of The User is Not Present ro get SubSection Data`
      })
    }

    const subSectionData= await subSectionModel.findById(id)
    return res.status(200).json({
      success:true,
      message:"SubSection Data Fetched Successfully",
      data:subSectionData
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Fetch SubSection data because of ERROR`,
      error:error
    })
  }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionName, description, id, courseId, sectionId } = req.body;

    if (!subSectionName || !id) {
      return res.status(403).json({
        success: false,
        message: `SubSection Name and Id are required`
      });
    }

    // Update the sub-section
    const updatedSubSection = await subSectionModel.findByIdAndUpdate(
      id,
      {
        title: subSectionName,  // Assuming title corresponds to subSectionName
        description
      },
      { new: true }
    );

    // Get the updated course data with populated sub-sections
    const updatedCourse = await courseModel.findById(courseId)
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
          model: 'subSectionModel',
          select: 'title description videoURL'
        }
      });

    return res.status(200).json({
      success: true,
      message: "SubSection Updated Successfully",
      data: updatedCourse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to update SubSection due to ERROR`,
      error: error.message
    });
  }
};



exports.deleteSubSection = async (req, res) => {
  try {
    const { id, courseId, sectionId } = req.body;

    console.log("Sub-Section ID: ", id);
    console.log("Section ID: ", sectionId);
    console.log("Course ID: ", courseId);

    if (!id) {
      return res.status(403).json({
        success: false,
        message: `SubSection ID is not provided`
      });
    }

    // Remove the subsection from the section
    const updatedSection = await sectionModel.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: id }  // Remove the sub-section reference from the section
      },
      { new: true }
    );

    // Delete the sub-section document
    const deletedSubSection = await subSectionModel.findByIdAndDelete(id);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: 'SubSection not found'
      });
    }

    // Get the updated course data after deleting the sub-section
    const updatedCourse = await courseModel.findById(courseId)
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
          model: 'subSectionModel',
          select: 'title description videoURL'
        }
      });

    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
      data: updatedCourse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to delete SubSection due to ERROR`,
      error: error.message
    });
  }
};
