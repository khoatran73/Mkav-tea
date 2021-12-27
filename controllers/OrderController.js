const User = require("../models/User")
const Product = require("../models/Product")

class OrderController {
    async order(req, res) {
        const email = req.session.email || ""
        let user

        await User.findOne({ email: email })
            .then(u => {
                if (u) {
                    user = u
                }
            })
            .catch(err => {
                console.log(err)
            })

        await Product.find({})
        .then(products => {
            res.render("order", {
                user: user || null,
                products: products
            })
        })
    }
}

module.exports = new OrderController()
