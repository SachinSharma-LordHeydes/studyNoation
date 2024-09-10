const catagoryModel = require("../Models/catagoryModel");



exports.createCatagoryHandler=async(req,res)=>{
  try {
    const {name,description}=req.body;
    if(!name || !description){
      return res.status(500).json({
        success:true,
        message:`All filed are required`
      });
    }

    const catagoryDetails=await catagoryModel.create({
      name:name,
      descp:description
    });

    console.log(catagoryDetails);

    return res.status(200).json({
      success:true,
      message:`Catagory created SuccessFully`
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Failed To create Caragory because of ERROR => ${error}`
    })
  }
}



exports.showAllCatagoryHandler=async(req,res)=>{
  try {
    
    const allCatagories=await catagoryModel.find({},{name:true,descp:true})

    return res.status(200).json({
      success:true,
      allCatagories,
      message:`All Catagory Displayed SuccessFully`
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Failed To Show All Caragory because of ERROR => ${error}`
    })
  }
}