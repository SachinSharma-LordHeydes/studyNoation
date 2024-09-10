const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");


exports.sectionHandler=async(req,res)=>{
  try {
    console.log("Req => ",req.body)
    console.log("REquest Params => ",req.params)
    const {sectionName}=req.body;
    const {id}=req.params;
    const validObjectId = id.replace(':', '');
    if(!sectionName || !id){
      return res.status(403).json({
        success:false,
        message:`Section Name and Id of The User is Not Present`
      })
    }

    const newSection=sectionModel.create({
      sectionName
    })

    const updatedCourse= await courseModel.findByIdAndUpdate(
      validObjectId,
      {
        $push:{
          courseContent:newSection._id
        }
      }
    )//use populate to replace sections subsections both in the updated course detail

    return res.status(200).json({
      success:true,
      message:"Section Created Successfully",
      data:updatedCourse
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to create Section because of ERROE =>${error}`
    })
  }
}

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
      {id},
      {
        sectionName
      },
      {new:true}
    )

    return res.status(200).json({
      success:true,
      message:"SubSection Created Successfully",
      data:updatedSection
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Update SubSection because of ERROE =>${error}`
    })
  }
}

exports.deleteSection=async(req,res)=>{
  try {

    const {id}=req.body;
    if(!id){
      return res.status(403).json({
        success:true,
        message:`Section Name and Id of The User is Not Present`
      })
    }

    const updatedSection= await sectionModel.findByIdAndDelete({id})

    return res.status(200).json({
      success:true,
      message:"SubSection Deleted Successfully",
      data:updatedSection
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to delete SubSection because of ERROE =>${error}`
    })
  }
}