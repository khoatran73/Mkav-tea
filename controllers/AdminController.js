const User = require("../models/User")
const cloudinary = require("../middlewares/cloudinary")

class AdminController {
    async admin(req, res) {
        let userObj

        await User.find({})
            .then(users => {
                userObj = users
            })

        await User.findOne({ email: req.session.email })
            .then(user => res.render("admin", {
                users: userObj,
                admin: user
            }))
    }

    async getEmployee(req, res) {
        const _id = req.params._id
        await User.findOne({ _id: _id })
            .then(user => {
                if (user) {
                    return res.json({
                        code: 0,
                        message: "success",
                        user: user
                    })
                }
            })
            .catch(err => res.json({
                code: 1,
                message: "Invalid Id"
            }))
    }

    async deleteEmployee(req, res) {
        const _id = req.query._id

        await User.findOne({ _id: _id })
            .then(async user => {
                await cloudinary.uploader.destroy(user.cloudinary_id)

                await User.deleteOne({ _id: _id })
                    .then(() => res.json({
                        code: 0,
                        message: "success"
                    }))
                    .catch(err => res.json({
                        code: 1,
                        message: err
                    }))
            })
            .catch(err => res.json({ code: 1, message: err.message }))
    }
}

module.exports = new AdminController()
