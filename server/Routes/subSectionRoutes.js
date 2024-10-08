const express = require('express');
const {createSubSectionHandler,deleteSubSection,updateSubSection,getSubSectionHandler} = require('../Controlleres/subSectionHandler');
const router = express.Router();

router.post('/course/addSubSection', createSubSectionHandler);
router.post('/course/deleteSubSection', deleteSubSection);
router.post('/course/updateSubSection', updateSubSection);
router.post('/course/getSubSectionHandler', getSubSectionHandler);

module.exports = router;