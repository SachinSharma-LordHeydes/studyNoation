const express = require('express');
const {profileHandler,updateProfile,updateProfilePicture} = require('../Controlleres/profileHandler');

const router = express.Router();

router.get('/profile/getUserDetails', profileHandler);
router.post('/profile/updateProfile',updateProfile);
router.post('/profile/updateProfilePicture',updateProfilePicture);

module.exports = router;