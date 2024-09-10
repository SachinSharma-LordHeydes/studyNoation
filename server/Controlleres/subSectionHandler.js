const sectionModel = require("../Models/sectionModel");
const subSectionModel = require("../Models/subSectionModel");
const { uploadFiles } = require("../utils/fileUploader");

require("dotenv").config();


exports.createSubSection=async(req,res)=> {
  
  try {
    // console.log("request Body => ",req.body)
    const {title,timeDuration,description}=req.body;
    // console.log("Req.FIles => ",req.files)
    var {id}=req.params;
    id=id.replace(":","");
    const {videoURL}=req.files;

    if(!title || !timeDuration || !description || !videoURL){
      return req.ststus(403).json({
        success:false,
        message:`All fields are requires to create Subsections`
      });
    }

    const videoUploaded=await uploadFiles(videoURL,process.env.FOLDER_NAME);

    const newSubSection=await subSectionModel.create(
      {
        title,
        timeDuration,
        description,
        videoURL:videoUploaded.secure_url
      }
    );

    console.log("New SubSection Data => ",newSubSection)

    const updatedSection=await sectionModel.findOneAndUpdate(
      {id},
      {
        subSection:newSubSection._id
      }
    )


    return res.status(200).json({
      success:true,
      message:`SuccessFully Create SubSection`,
      data:updatedSection
    })


  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Create SubSection because of ERROR => ${error}`
    })
  }


}