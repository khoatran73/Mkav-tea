const User = require("../models/User")
const positionHelper = require("../helper/position-helper")
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)

class AdminController {
    async admin(req, res) {
        let userObj

        await User.find({})//({ position: { $ne: 0 } })
            .then(users => {
                userObj = users
            })
            .catch(err => {
                return res.render("error")
            })

        await User.findOne({ email: req.session.email })
            .then(user => {
                res.render("admin", {
                    users: userObj,
                    admin: user
                })
            })
            .catch(err => {
                return res.render("error")
            })
    }

    async getEmployee(req, res) {
        const _id = req.params._id
        await User.findOne({ _id: _id })
            .then(user => {
                if (user) {
                    res.json({
                        code: 0,
                        message: "success",
                        user: user
                    })
                }
            })
            .catch(err => {
                res.json({
                    code: 1,
                    message: "Invalid Id"
                })
            })
    }

    async deleteEmployee(req, res) {
        const _id = req.query._id

        await User.findOne({ _id: _id })
            .then(async user => {
                await User.deleteOne({ _id: _id })
                    .then(() => {
                        unlink(path.join(__dirname, '../public/' + user.image))
                        return res.json({
                            code: 0,
                            message: "success"
                        })
                    })
                    .catch(err => {
                        return res.json({
                            code: 1,
                            message: err
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })




    }
}

module.exports = new AdminController()
