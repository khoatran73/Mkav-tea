const express = require('express')
const router = express.Router()
const siteController = require("../controllers/SiteController")
const checkUser = require("../middlewares/checkUser")

router.get("/", siteController.index)
router.get("/store", siteController.store)
router.get("/profile", checkUser, siteController.profile)

module.exports = router