const Product = require("../models/Product")
const User = require("../models/User")
const cloudinary = require("../middlewares/cloudinary")

class AdminController {
    async customerCare(req, res) {
        let user

        await User.findOne({ email: req.session.email })
            .then(u => {
                user = u
            })

        await Product.find({})
            .then(products => res.render("customer-care", {
                user: user,
                products: products
            }))
    }

    async addProduct(req, res) {
        const { name, type, price, oldPrice } = req.body

        if (!name || !type || !price || !oldPrice || !req.file) {
            return res.json({ code: 1, message: "Vui lòng nhập đủ thông tin sản phẩm" })
        } else {
            try {
                const result = await cloudinary.uploader.upload(req.file.path)

                let productJson = {
                    id: (Math.random() + 1).toString(36).substring(2),
                    cloudinary_id: result.public_id,
                    name: name,
                    image: result.secure_url,
                    type: type,
                    price: price,
                    oldPrice: oldPrice,
                    customerCare: req.session.email,
                    createdAt: (new Date().getHours()) + ":" + (new Date().getMinutes()) + " ngày " + (new Date().getDate()) + "/" + (new Date().getMonth()) + "/" + (new Date().getFullYear())
                }

                let product = new Product(productJson)
                product.save()

                return res.json({
                    code: 0,
                    message: "Success",
                    product: product
                })
            } catch (err) {
                return res.json({
                    code: 2,
                    message: err.message
                })
            }

        }
    }

    async getProduct(req, res) {
        const id = req.params.id
        await Product.findOne({ id: id })
            .then(product => {
                if (product) {
                    res.json({
                        code: 0,
                        message: "success",
                        product: product
                    })
                }
            })
            .catch(() => res.json({
                code: 1,
                message: "Invalid Id"
            }))
    }

    async editProduct(req, res) {
        const id = req.query.id
        const { name, type, price, oldPrice } = req.body

        if (!name || !type || !price || !oldPrice) {
            return res.json({ code: 1, message: "Vui lòng nhập đủ thông tin" })
        } else {
            if (req.file) {
                await Product.findOne({ id: id })
                    .then(async product => {
                        await cloudinary.uploader.destroy(product.cloudinary_id)
                    })

                const result = await cloudinary.uploader.upload(req.file.path)

                await Product.updateOne({ id: id }, {
                    name: name,
                    type: type,
                    price: price,
                    oldPrice: oldPrice,
                    image: result.secure_url,
                    cloudinary_id: result.cloudinary_id
                })
                    .then(() => res.json({ code: 0, message: "success" }))
            } else {
                await Product.updateOne({ id: id }, {
                    name: name,
                    type: type,
                    price: price,
                    oldPrice: oldPrice,
                })
                    .then(() => res.json({ code: 0, message: "success" }))
            }
        }
    }

    async deleteProduct(req, res) {
        const id = req.query.id

        await Product.findOne({ id: id })
            .then(async product => {
                await cloudinary.uploader.destroy(product.cloudinary_id)

                await Product.deleteOne({ id: id })
                    .then(() => res.json({
                        code: 0,
                        message: "success"
                    }))
                    .catch(err => res.json({
                        code: 1,
                        message: err.message
                    }))
            })
            .catch(err => res.json({ code: 1, message: err.message }))
    }
}


module.exports = new AdminController()
