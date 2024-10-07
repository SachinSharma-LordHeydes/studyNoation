const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");






exports.getSectionHandler=async(req,res)=>{
  try {
    const {id}=req.body;

    if(!id){
      return res.status(403).json({
        success:false,
        message:'Id Unavilable'
      })
    }

    const response=await sectionModel.findById(id).populate('courseContent');
    
    if(!response){
      return res.status(403).json({
        success:false,
        message:'Invalid ID/course Not Found'
      })
    }

    return res.status(200).json({
      success:true,
      message:"Section Fetched Successfully",
      data:response.courseContent
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Get Section`,
      error:error
    })
  }
}



exports.createSectionHandler = async (req, res) => {
  try {
    console.log("Req => ", req.body);
    console.log("Request Params => ", req.params);

    const { sectionName , id } = req.body;
    const validObjectId = id.replace(':', '');

    if (!sectionName) {
      return res.status(403).json({
        success: false,
        message: "Section Name is Not Present"
      });
    }

    if (!id) {
      return res.status(403).json({
        success: false,
        message: "Id of The Course is Not Present"
      });
    }

    // Await the section creation
    const newSection = await sectionModel.create({
      sectionName
    });

    // Push the section ID into the courseContent array
    const updatedCourse = await courseModel.findByIdAndUpdate(
      validObjectId,
      {
        $push: {
          courseContent: newSection._id
        }
      },
      { new: true } // to return the updated document
    ).populate("courseContent"); // Populate the courseContent to see the new section data

    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      data: updatedCourse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to create Section because of ERROR`,
      error:error
    });
  }
};


exports.updateSection=async(req,res)=>{
  try {

    const {sectionName,id}=req.body;
    if(!sectionName || !id){
      return res.status(403).json({
        success:true,
        message:`Section Name and Id of The User is Not Present`
      })
    }

    const updatedSection= await sectionModel.findByIdAndUpdate(
      id,
      {
        sectionName
      },
      {new:true}
    )

    const updatedCourse= await await courseModel.findOne(
      {courseContent:id},
      { new: true } // to return the updated document
    ).populate("courseContent");

    return res.status(200).json({
      success:true,
      message:"SubSection Updated Successfully",
      data:updatedCourse
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Update SubSection because of ERROR`,
      error:error
    })
  }
}

exports.deleteSection=async(req,res)=>{
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