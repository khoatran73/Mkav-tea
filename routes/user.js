const express = require('express')
const router = express.Router()
const userController = require("../controllers/UserController")
const upload = require('../middlewares/user-upload')
const validate = require('../middlewares/validate')
const rejectUser = require('../middlewares/rejectUser')

router.get("/login", rejectUser, userController.login)
router.get("/register", rejectUser, userController.register)
router.post("/register", rejectUser, upload.single('image'), validate, userController.addNewUser)
router.post("/login", rejectUser, userController.checkLogin)
router.get("/logout", userController.logout)

module.exports = router