const express = require('express')
const router = express.Router()
const siteController = require("../controllers/SiteController")

router.get("/", siteController.index)
router.get("/store", siteController.store)

module.exports = router