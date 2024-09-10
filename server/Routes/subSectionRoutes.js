const express = require('express');
const {createSubSection} = require('../Controlleres/subSectionHandler');
const router = express.Router();

router.post('/createsubsection:id', createSubSection);

module.exports = router;