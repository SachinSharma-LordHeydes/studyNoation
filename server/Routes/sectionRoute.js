const express = require('express');
const {createSectionHandler,getSectionHandler,updateSection,deleteSection} = require('../Controlleres/sectionHandler');
const router = express.Router();

router.post('/course/addSection',createSectionHandler);
router.post('/course/updateSection',updateSection);
router.delete('/course/deleteSection',deleteSection);
router.get('/course/getSection',getSectionHandler);

module.exports = router;