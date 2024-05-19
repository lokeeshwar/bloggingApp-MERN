const express = require("express");
const router = express.Router()
const {test,updateUser,deleteUser,signout} = require('../controllers/userController')
const {verifyToken} = require('../utils/verifyUser')

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout/',signout)

module.exports = router

 