const express = require('express');
const router = express.Router();
const { controllerSubmitRating } = require('../controllers/ratingController');
const validateRating = require('../middlewares/validateRating');
const {allowedRoles} = require("../middlewares/validateSession");

router.post('/submit', allowedRoles(['user']), validateRating, controllerSubmitRating);

module.exports = router;
