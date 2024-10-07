const express = require('express');
const {createCourseHandler,getCourseDetails,editCourseHandler} = require('../Controlleres/createCourseHandler');
const { authMiddleware,isInstructorMiddleware } = require('../middleware/authMiddlerwares');
const router = express.Router();

router.post('/course/createCourse',authMiddleware,isInstructorMiddleware, createCourseHandler);
router.post('/course/editCourse',authMiddleware,isInstructorMiddleware, editCourseHandler);
router.get('/course/getCourseDetails',authMiddleware,isInstructorMiddleware, getCourseDetails);

module.exports = router;