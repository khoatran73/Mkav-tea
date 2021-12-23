class SiteController {
    index(req, res) {
        res.render('index')
    }

    store(req, res) {
        res.render('store')
    }
} 

module.exports = new SiteController()
