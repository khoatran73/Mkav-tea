const express = require('express')
const router = express.Router()
const adminController = require("../controllers/AdminController")
const userController = require("../controllers/UserController")
const admin = require("../middlewares/admin")
const upload = require('../middlewares/user-upload')
const validate = require('../middlewares/validate')

router.get("/", admin, adminController.admin)
router.get("/:_id", admin, adminController.getEmployee)
router.post("/add-employee", admin, upload.single('image'), validate, userController.addNewUser)
router.put("/edit-employee", admin, upload.single('image'), validate, userController.editUser)
router.delete("/delete-employee", admin, adminController.deleteEmployee)

module.exports = router
