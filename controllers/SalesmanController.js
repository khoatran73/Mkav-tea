const User = require('../models/User')
const Order = require('../models/Order')

class SalesmanController {
    async salesman(req, res) {
        await User.findOne({ email: req.session.email })
            .then(async user => {
                if (user) {
                    await Order.find({})
                        .then(orders => {
                            return res.render("salesman", { salesman: user, orders: orders })
                        })

                }
            })
    }

    async updateOrderStatus(req, res) {
        const _id = req.params._id
        const status = req.body.status

        if (!_id) return res.json({ code: 1, message: "invalid _id" })
        if (!status) return res.json({ code: 1, message: "status not found" })


        await Order.updateOne({ _id: _id }, { status: status })
            .then(() => res.json({ code: 0, message: "success" }))
    }
}

module.exports = new SalesmanController()