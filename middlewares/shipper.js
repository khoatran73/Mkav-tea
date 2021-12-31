const User = require('../models/User')

async function shipper(req, res, next) {
    if (!req.session.email) {
        return res.redirect("/user/login")
    } else {
        await User.findOne({ email: req.session.email })
            .then(user => {
                if (user.position === 2) //shipper
                    next()
                else {
                    return res.redirect("/")
                }
            })
    }
}

module.exports = shipper
