const express = require("express");
const router = express.Router()
const {verifyToken} = require('../utils/verifyUser')



router.post('/create',verifyToken,)

module.exports = router