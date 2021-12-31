const express = require('express')
const router = express.Router()
const siteController = require("../controllers/SiteController")

router.use(siteController.error)

module.exports = router