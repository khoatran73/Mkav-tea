const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)
const { validationResult } = require('express-validator')
const User = require("../models/User")

class UserController {
    login(req, res) {
        res.render("login")
    }

    register(req, res) {
        res.render("register")
    }

    checkLogin(req, res) {
        let { email, password } = req.body

        User.findOne({ email: email }, function (err, user) {
            let error
            if (user === null) {
                error = "Email hoặc mật khẩu không đúng" // sai email
            } else {
                if (user.validPassword(password)) {
                    req.session.email = user.email
                    res.json({
                        code: 0,
                        message: "success"
                    })

                }
                else {
                    error = "Email hoặc mật khẩu không đúng" // sai mat khau
                    console.log("sai mat khau")
                }
            }

            if (error) {
                res.json({
                    code: 1,
                    message: error
                })
                // res.render('login', {
                //     title: "Login",
                //     error: error,
                //     email: req.body.email
                // })
            }
        })
    }

    async addNewUser(req, res) {
        let result = validationResult(req)
        let error = ""

        if (!result.isEmpty()) {
            error = result.errors[0].msg
            if (req.file) {
                unlink(path.join(__dirname, '../public/images/users/' + req.file.filename))
            }
            return res.json({
                code: 1,
                message: error
            })
        } else {
            let { name, email, password } = req.body

            if (req.file) {
                if (!req.file.mimetype.match(/image.*/)) {
                    error = "Chỉ hổ trợ định dạng hình ảnh"
                } else if (req.file.size > (1024 * 1024 * 20)) {
                    error = "Size ảnh không được quá 20MB"
                }
            } else {
                error = "Vui lòng chọn ảnh đại diện"
            }

            await User.find({ email: email })
                .then(user => {
                    if (user.length > 0) {
                        error = "Email đã tồn tại"
                    }
                })

            if (error) {
                if (req.file) {
                    unlink(path.join(__dirname, '../public/images/users/' + req.file.filename))
                }

                return res.json({
                    code: 1,
                    message: error
                })
            } else {
                let userJson = {
                    name: name,
                    email: email,
                    position: 0,
                    image: req.file.path.split("\\").slice(1).join("/")
                }

                let user = new User(userJson)
                user.setPassword(password)
                user.save()

                return res.json({
                    code: 0,
                    message: "Success"
                })
            }
        }
    }

    logout(req, res) {
        delete req.session.email
        res.redirect("/")
    }
}

module.exports = new UserController()
