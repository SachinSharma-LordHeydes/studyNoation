const express = require('express');
const {sectionHandler} = require('../Controlleres/sectionHandler');
const router = express.Router();

router.post('/createsection:id', sectionHandler);

module.exports = router;