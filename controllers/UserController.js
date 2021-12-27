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
            const { name, gender, email, password } = req.body

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
                    gender: gender,
                    email: email,
                    position: parseInt(req.body.position) || 0,
                    image: req.file.path.split("\\").slice(1).join("/")
                }

                let user = new User(userJson)
                user.setPassword(password)
                user.save()

                return res.json({
                    code: 0,
                    message: "Success",
                    user: user
                })
            }
        }
    }

    async editUser(req, res) {
        const _id = req.query._id
        const { name, email, position, gender } = req.body
        let image = ""
        let user

        if (!name || !email || !position || !gender) {
            if (req.file)
                unlink(path.join(__dirname, '../public/images/users/' + req.file.filename))
                
            return res.json({ code: 1, message: "Không được để trống bất kỳ trường nào" })
        }

        await User.findOne({ _id: _id })
            .then(u => {
                user = u
            })

        if (req.file) {
            image = req.file.path.split("\\").slice(1).join("/")
            unlink(path.join(__dirname, '../public/' + user.image))
        }

        await User.updateOne({ _id: _id }, {
            name: name,
            email: email,
            gender: gender,
            position: position,
            image: image || user.image
        })
            .then(async () => {
                await User.findOne({ _id: _id })
                    .then(user => {
                        res.json({
                            code: 0, message: "success", user: user
                        })
                    })

            })
            .catch(err => {
                console.log(err)
            })
    }

    async editCustomer(req, res) {
        const { name, phone, address } = req.body
        let error
        if (!name) {
            // error = "Họ tên không được để trống"
            return res.json({
                code: 1,
                message: "Họ tên không được để trống"
            })
        }

        await User.updateOne({ email: req.session.email }, { name: name, phone: phone, address: address })
            .then(() => {
                return res.json({
                    code: 0,
                    message: "success"
                })
            })
            .catch(err => {
                return res.json({
                    code: 1,
                    message: err.message
                })
            })

    }

    logout(req, res) {
        delete req.session.email
        res.redirect("/")
    }
}

module.exports = new UserController()
