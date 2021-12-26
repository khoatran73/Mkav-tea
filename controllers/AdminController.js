const Product = require("../models/Product")

class AdminController {
    admin(req, res) {
        res.end("admin")
    }

    addProduct(req, res) {
        console.log(req.body)
    }
} 

module.exports = new AdminController()
