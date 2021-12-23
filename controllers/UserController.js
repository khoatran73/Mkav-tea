const User = require("../models/User")

class UserController {
    login(req, res) {
        res.render("login")
    }

    register(req, res) {
        res.render("register")
    }

    checkLogin(req, res) {
        res.end("post login")
    }

    addNewUser(req, res) {
        // const { name, email, password, password2 } = req.body
        console.log(req.body)
        // res.end("post new user")

    }
}

module.exports = new UserController()
