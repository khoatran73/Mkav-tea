function checkUser(req, res, next) {
    if (!req.session.email) {
        res.redirect("/user/login")
    } else {
        next()
    }
}

module.exports = checkUser
