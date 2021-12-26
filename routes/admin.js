const express = require('express')
const router = express.Router()
const adminController = require("../controllers/AdminController")
const admin = require("../middlewares/admin")

router.get("/", admin, adminController.admin)
router.post("/addEmployee", admin, adminController.addEmployee)
router.put("/editEmployee", admin, adminController.editEmployee)
router.delete("/deleteEmployee", admin, adminController.deleteEmployee)

module.exports = router
