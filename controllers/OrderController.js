const User = require("../models/User")
const Product = require("../models/Product")
const Cart = require("../models/Cart")

class OrderController {
    async order(req, res) {
        const email = req.session.email
        let user
        let cart

        await User.findOne({ email: email })
            .then(u => {
                if (u) {
                    user = u
                }
            })

        await Cart.findOne({ email: req.session.email })
            .then(c => {
                cart = c
            })

        await Product.find({})
            .then(products => res.render("order", {
                user: user || null,
                products: products,
                cart: cart
            }))
    }
}

module.exports = new OrderController()
