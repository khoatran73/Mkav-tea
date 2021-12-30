const User = require("../models/User")
const Order = require("../models/Order")

class SiteController {
    async index(req, res) {
        const email = req.session.email || ""
        await User.findOne({ email: email })
            .then(user => {
                if (user) {
                    return res.render('index', {
                        user: user
                    })
                } else {
                    return res.render('index')
                }
            })
            .catch(err => {
                res.render("error")
            })
    }

    async store(req, res) {
        const email = req.session.email || ""
        await User.findOne({ email: email })
            .then(user => {
                if (user) {
                    return res.render('store', {
                        user: user
                    })
                } else {
                    return res.render('store')
                }
            })
            .catch(err => {
                res.render("error")
            })
    }

    async profile(req, res) {
        const email = req.session.email
        let orders

        await Order.find({ email: email })
            .then(ods => {
                orders = ods
            })

        await User.findOne({ email: email })
            .then(user => {
                if (user) {
                    return res.render('profile', {
                        user: user,
                        orders: orders || null
                    })
                } else {
                    return res.redirect("/")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = new SiteController()
