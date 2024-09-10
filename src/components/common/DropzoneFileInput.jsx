import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from "react-icons/fi";
import HighligthText from '../HomePage/HighligthText';


const DropzoneFileInput = ({register }) => {

  const [filePreview, setFilePreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
     const file = acceptedFiles[0];
    setFilePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,video/*'
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[250px] items-center flex justify-center bg-richblack-700"
    >
      <input {...getInputProps()} {...register} name='thumbnail' />

        {
          filePreview?
          (
            <div>
              <img src={filePreview} alt="" />
            </div>
          ):
          (
            <div className='space-y-5 text-richblack-200'>
              <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
                <div className='bg-richblack-800 rounded-full p-3'>
                  <FiUploadCloud size={40} color='yellow'/>
                </div>

                <div>
                  <p className='text-sm'>Drag and drop an image, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'}></HighligthText> a file</p>
                </div>

              </div>
              <div>
                <ul className='flex text-xs justify-between list-disc'>
                  <li>Aspect ratio 16:9</li>
                  <li>Recommended size 1024x576</li>
                </ul>
              </div>
            </div>
          )
        }
        
    </div>
  );
};

export default DropzoneFileInput;
