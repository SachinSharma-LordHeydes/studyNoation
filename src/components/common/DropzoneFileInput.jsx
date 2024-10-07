

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import HighligthText from '../HomePage/HighligthText';


const FileUploadWithPreview = ({setValue,courseDetails}) => {

  useEffect(() => {
    if (courseDetails?.thumbnail) {
      setValue('thumbnail', courseDetails.thumbnail);
    }
  }, [courseDetails, setValue]);

  // console.log("Thumbnail Preview => ",thumbnailPreview)

  const [filePreview, setFilePreview] = useState(null); 
  const [fileType, setFileType] = useState(null);

  useEffect(()=>{
    console.log("CourseDetails=> ",courseDetails)
  },[courseDetails])

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl); // Set the preview URL to state
    setFileType(file.type.split('/')[0]);
    setValue('thumbnail', file , { shouldValidate: true });
  }, [setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,video/*',
  });

  return (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[200px] items-center flex justify-center bg-richblack-700"
        >
          <input {...getInputProps()}  name='thumbnail'  />

          <div>
            {
              courseDetails?.thumbnail?
              <div>
                {/* {
                  modalState? */}
                  <div>
                    {/* <div className='space-y-5 text-richblack-200'>
                      <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
                        <div className='bg-richblack-800 rounded-full p-3'>
                          <FiUploadCloud size={40} color='yellow' />
                        </div>
          
                        <div>
                          <p className='text-sm'>Drag and drop an image or video, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'} /></p>
                        </div>
                      </div>
                      <div>
                        <ul className='flex text-xs justify-between list-disc'>
                          <li>Aspect ratio 16:9</li>
                          <li>Recommended size 1024x576</li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                  :
                  <div>
                    <img src={courseDetails?.thumbnail} alt={`Preview pics`} className="max-h-[200px]" />
                  </div>
                {/* } */}
              </div>
              :
              <div>
                 {
                    filePreview ? (
                      <div>
                        {fileType === 'image' ? (
                          <img src={filePreview} alt="Preview" className="max-h-[200px]" />
                        ) : fileType === 'video' ? (
                          <video controls className="max-h-[200px]">
                            <source src={filePreview} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : null}
                      </div>
                    ) : (
                      <div className='space-y-5 text-richblack-200'>
                        <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
                          <div className='bg-richblack-800 rounded-full p-3'>
                            <FiUploadCloud size={40} color='yellow' />
                          </div>
            
                          <div>
                            <p className='text-sm'>Drag and drop an image or video, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'} /></p>
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
            }
          </div>
        </div>
      );
    };

export default FileUploadWithPreview;
