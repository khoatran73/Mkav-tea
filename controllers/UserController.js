const { validationResult } = require('express-validator')
const User = require("../models/User")
const cloudinary = require("../middlewares/cloudinary")

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
                return res.json({
                    code: 1,
                    message: error
                })
            } else {
                try {
                    const result = await cloudinary.uploader.upload(req.file.path)

                    let userJson = {
                        cloudinary_id: result.public_id,
                        name: name,
                        gender: gender,
                        email: email,
                        position: parseInt(req.body.position) || 0,
                        // image: req.file.path.split("\\").slice(1).join("/")
                        image: result.secure_url
                    }

                    let user = new User(userJson)
                    user.setPassword(password)
                    user.save()

                    return res.json({
                        code: 0,
                        message: "Success",
                        user: user
                    })
                } catch (err) {
                    return res.json({
                        code: 2,
                        message: err,
                    })
                }

            }
        }
    }

    async editUser(req, res) {
        const _id = req.query._id
        const { name, email, position, gender } = req.body

        await User.findOne({ _id: _id })
            .then(async u => {
                if (u.position === 0) {
                    return res.json({
                        code: 1,
                        message: "Không được phép sửa thông tin khách hàng"
                    })
                } else {
                    if (!name || !email || !position || !gender) {
                        return res.json({ code: 1, message: "Không được để trống bất kỳ trường nào" })
                    } else {
                        if (req.file) {
                            await cloudinary.uploader.destroy(u.cloudinary_id)

                            const result = await cloudinary.uploader.upload(req.file.path)
                            await User.updateOne({ _id: _id }, {
                                name: name,
                                email: email,
                                gender: gender,
                                position: position,
                                image: result.secure_url,
                                cloudinary_id: result.public_id
                            })
                                .then(async () => {
                                    await User.findOne({ _id: _id })
                                        .then(user => res.json({
                                            code: 0, message: "success", user: user
                                        }))

                                })
                        } else {
                            await User.updateOne({ _id: _id }, {
                                name: name,
                                email: email,
                                gender: gender,
                                position: position
                            })
                                .then(async () => {
                                    await User.findOne({ _id: _id })
                                        .then(user => res.json({
                                            code: 0, message: "success", user: user
                                        }))

                                })
                        }
                    }
                }
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

    async editUserImage(req, res) {
        if (req.file) {
            if (!req.file.mimetype.match(/image.*/)) {
                error = "Chỉ hổ trợ định dạng hình ảnh"
            } else if (req.file.size > (1024 * 1024 * 20)) {
                error = "Size ảnh không được quá 20MB"
            } else {
                await User.findOne({ email: req.session.email })
                    .then(async user => {
                        await cloudinary.uploader.destroy(user.cloudinary_id)
                    })

                try {
                    const result = await cloudinary.uploader.upload(req.file.path)
                    await User.updateOne({ email: req.session.email }, {
                        image: result.secure_url,
                        cloudinary_id: result.public_id
                    })
                        .then(() => {
                            return res.json({ code: 0, message: "success" })
                        })
                        .catch(err => {
                            return res.json({ code: 1, message: err.message })
                        })
                } catch (err) {
                    return res.json({ code: 2, message: err })
                }


            }
        }
    }

    async updatePhoneAddressUser(req, res) {
        const { phone, address } = req.body
        if (!phone || !address) {
            return res.json({ code: 1, message: "Vui lòng nhâp đủ thông tin" })
        } else {
            await User.updateOne({ email: req.session.email }, { phone: phone, address: address })
                .then(() => {
                    return res.json({ code: 0, message: "Success" })
                })
                .catch(err => res.json({ code: 1, message: err.message }))
        }
    }

    async getPhoneAddressUser(req, res) {
        if (!req.session.email) {
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })
        }
        else {
            await User.findOne({ email: req.session.email })
                .then(user => {
                    if (user) {
                        if (!user.phone) {
                            return res.json({ code: 1, message: "Phone not found", address: user.address || "" })
                        } else if (!user.address) {
                            return res.json({ code: 1, message: "Address not found", phone: user.phone || "" })
                        } else {
                            return res.json({ code: 0, message: "Enough" })
                        }
                    }
                })
                .catch(err => res.json({ code: 1, message: err.message }))
        }
    }

    logout(req, res) {
        delete req.session.email
        res.redirect("/")
    }
}

module.exports = new UserController()
