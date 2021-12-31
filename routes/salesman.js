const express = require('express')
const router = express.Router()
const salesmanController = require("../controllers/SalesmanController")
const salesman = require("../middlewares/salesman")

router.get("/", salesman, salesmanController.salesman)
router.put("/update-status/:_id", salesman, salesmanController.updateOrderStatus)

module.exports = router