const User = require("../models/User")

class SiteController {
    async index(req, res) {
        const email = req.session.email || ""
        await User.find({ email: email })
            .then(user => {
                if (user.length) {
                    return res.render('index', {
                        user: user[0]
                    })
                } else {
                    return res.render('index')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    store(req, res) {
        res.render('store')
    }

    async profile(req, res) {
        const email = req.session.email || ""
        await User.find({ email: email })
            .then(user => {
                if (user.length) {
                    return res.render('profile', {
                        user: user[0]
                    })
                } else {
                    return res.render('profile')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = new SiteController()
