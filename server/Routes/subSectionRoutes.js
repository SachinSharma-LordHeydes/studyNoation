const express = require('express');
const {createSubSectionHandler} = require('../Controlleres/subSectionHandler');
const router = express.Router();

router.post('/course/addSubSection', createSubSectionHandler);

module.exports = router;