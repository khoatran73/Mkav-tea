const User = require("../models/User")
const Order = require("../models/Order")
const Product = require("../models/Product")

class SiteController {
    async index(req, res) {
        const email = req.session.email || ""
        let user, products

        await User.findOne({ email: email })
            .then(u => {
                user = u
            })

        await Product.find({}).sort({ price: "desc" })
            .then(prs => {
                products = prs
            })

        return res.render("index", { user: user, products: products })
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

    error(req, res) {
        res.status(404)
        res.render('error')
    }
}

module.exports = new SiteController()
