const express = require('express');
const {createCourseHandler} = require('../Controlleres/createCourseHandler');
const { authMiddleware,isInstructorMiddleware } = require('../middleware/authMiddlerwares');
const router = express.Router();

router.post('/createcourse',authMiddleware,isInstructorMiddleware, createCourseHandler);

module.exports = router;