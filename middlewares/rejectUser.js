function rejectUser(req, res, next) {
    if (req.session.email) {
        res.redirect("/")
    } else {
        next()
    }
}

module.exports = rejectUser