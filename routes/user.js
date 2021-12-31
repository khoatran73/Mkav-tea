const express = require('express')
const router = express.Router()
const userController = require("../controllers/UserController")
const upload = require('../middlewares/user-upload')
const validate = require('../middlewares/validate')
const rejectUser = require('../middlewares/rejectUser')
const checkUser = require('../middlewares/checkUser')

router.get("/login", rejectUser, userController.login)
router.get("/register", rejectUser, userController.register)
router.post("/register", rejectUser, upload.single('image'), validate, userController.addNewUser)
// router.post("/register", rejectUser, upload.single('image'), userController.addNewUser)
router.post("/login", rejectUser, userController.checkLogin)
router.put("/edit-customer", checkUser, userController.editCustomer)
router.put("/edit-user-image", checkUser, upload.single('image'), userController.editUserImage)
router.get("/logout", userController.logout)

module.exports = router