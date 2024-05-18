const express = require("express");
const router = express.Router()
const {test,updateUser} = require('../controllers/userController')
const {verifyToken} = require('../utils/verifyUser')

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)

module.exports = router

 