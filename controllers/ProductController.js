class ProductController {
    product(req, res) {
        res.end("product")
    }
} 

module.exports = new ProductController()
