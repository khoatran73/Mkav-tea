const User = require("../models/User")

class OrderController {
    async order(req, res) {
        const email = req.session.email || ""
        await User.find({ email: email })
            .then(user => {
                if (user.length) {
                    return res.render('order', {
                        user: user[0]
                    })
                } else {
                    return res.render('order')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = new OrderController()
