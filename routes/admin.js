const express = require('express')
const router = express.Router()
const adminController = require("../controllers/AdminController")
const admin = require("../middlewares/admin")

router.get("/", admin, adminController.admin)
router.post("/addProduct", admin, adminController.addProduct)

module.exports = router
