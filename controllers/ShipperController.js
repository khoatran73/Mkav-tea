const User = require('../models/User')
const Order = require('../models/Order')

class ShipperController {
    async shipper(req, res) {
        await User.findOne({ email: req.session.email })
            .then(async user => {
                if (user) {
                    await Order.find({ status: 2 })
                        .then(orders => res.render("shipper", { shipper: user, orders: orders }))
                }
            })
    }
}

module.exports = new ShipperController()