
const cloudinary = require('cloudinary').v2;

exports.uploadFiles=async(file,folder)=>{
  
  const suportedType=['jpg','jpeg','png'];
  console.log("File => ",file)
  const filetype = file.name.split('.')[1].toLowerCase();

  if(!suportedType.includes(filetype)){
    console.log("File Type Not Supported");
    return;
  }

  const options = {
    folder: folder,
    resource_type: "auto",
  };

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    throw error;
  }
}



// const cloudinary = require('cloudinary').v2;

// exports.uploadFiles = async (file, folder) => {
//   const supportedTypes = ['jpg', 'jpeg', 'png'];
//   const filetype = file.originalname.split('.').pop().toLowerCase();

//   if (!supportedTypes.includes(filetype)) {
//     console.log("File Type Not Supported");
//     return;
//   }

//   const options = {
//     folder: folder,
//     resource_type: "auto",
//   };

//   try {
//     const result = await cloudinary.uploader.upload(file.tempFilePath, options);
//     return result;
//   } catch (error) {
//     console.log("Error uploading to Cloudinary:", error);
//     throw error;
//   }
// }

