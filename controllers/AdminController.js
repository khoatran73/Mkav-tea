const User = require("../models/User")

class AdminController {
    admin(req, res) {
        res.end("admin")
    }

    addEmployee(req, res) {
        console.log(req.body)
    }

    editEmployee(req, res) {
        console.log(req.body)
    }

    deleteEmployee(req, res) {
        console.log(req.body)
    }
} 

module.exports = new AdminController()
