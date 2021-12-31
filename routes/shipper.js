const express = require('express')
const router = express.Router()
const salesmanController = require("../controllers/SalesmanController")
const shipperController = require("../controllers/ShipperController")

router.get("/", shipperController.shipper)
router.put("/update-status/:_id", salesmanController.updateOrderStatus)

module.exports = router