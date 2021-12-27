const express = require('express')
const router = express.Router()
const customerCareController = require("../controllers/CustomerCareController")
const customerCare = require("../middlewares/customer-care")
const upload = require("../middlewares/product-upload")

router.get("/", customerCare, customerCareController.customerCare)
router.get("/:id", customerCare, customerCareController.getProduct)
router.post("/add-product", customerCare, upload.single("image"), customerCareController.addProduct)
router.put("/edit-product", customerCare, upload.single("image"), customerCareController.editProduct)
router.delete("/delete-product", customerCare, customerCareController.deleteProduct)

module.exports = router
