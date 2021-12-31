const User = require('../models/User')

async function salesman(req, res, next) {
    if (!req.session.email) {
        return res.redirect("/user/login")
    } else {
        await User.findOne({ email: req.session.email })
            .then(user => {
                if (user.position === 3) //salesman
                    next()
                else {
                    return res.redirect("/")
                }
            })
    }
}

module.exports = salesman
