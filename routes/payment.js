const express = require('express')
const router = express.Router()
const paymentController = require("../controllers/PaymentController")
const userController = require("../controllers/UserController")
const checkUser = require("../middlewares/checkUser")

router.post("/add-cart", checkUser, paymentController.addCart)
router.delete("/delete-cart/:id", checkUser, paymentController.deleteCartId)
router.delete("/delete-cart/", checkUser, paymentController.deleteCart)
router.get("/get-phone-address-user", userController.getPhoneAddressUser)
router.put("/update-phone-address-user", checkUser, userController.updatePhoneAddressUser)
router.get("/add-order", checkUser, paymentController.addOrder)
router.get("/:id", paymentController.payment)

module.exports = router
