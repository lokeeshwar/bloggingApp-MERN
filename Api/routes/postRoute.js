const express = require("express");
const router = express.Router()
const {verifyToken} = require('../utils/verifyUser')
const { create } = require('../controllers/postController')


router.post('/create',verifyToken,create)

module.exports = router