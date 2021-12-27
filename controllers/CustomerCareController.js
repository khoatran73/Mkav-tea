const Product = require("../models/Product")
const User = require("../models/User")
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)
// const { validationResult } = require('express-validator')

class AdminController {
    async customerCare(req, res) {
        let user

        await User.findOne({ email: req.session.email })
            .then(u => {
                user = u
            })
            .catch(err => {
                return res.render("error")
            })

        await Product.find({})
            .then(products => {
                res.render("customer-care", {
                    user: user,
                    products: products
                })
            })
            .catch(err => {
                return res.render("error")
            })
    }

    async addProduct(req, res) {
        const { name, type, price, oldPrice } = req.body

        if (!name || !type || !price || !oldPrice || !req.file) {
            if (req.file)
                unlink(path.join(__dirname, '../public/images/products/' + req.file.filename))

            return res.json({ code: 1, message: "Vui lòng nhập đủ thông tin sản phẩm" })
        } else {
            let productJson = {
                id: (Math.random() + 1).toString(36).substring(2),
                name: name,
                image: req.file.path.split("\\").slice(1).join("/"),
                type: type,
                price: price,
                oldPrice: oldPrice,
                customerCare: req.session.email
            }

            let product = new Product(productJson)
            product.save()

            return res.json({
                code: 0,
                message: "Success",
                product: product
            })
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
            .catch(err => {
                res.json({
                    code: 1,
                    message: "Invalid Id"
                })
            })
    }

    async editProduct(req, res) {
        const id = req.query.id
        const { name, type, price, oldPrice } = req.body
        let image = ""
        let product

        if (!name || !type || !price || !oldPrice) {
            if (req.file)
                unlink(path.join(__dirname, '../public/images/users/' + req.file.filename))

            return res.json({ code: 1, message: "Vui lòng nhập đủ thông tin" })
        } else {
            await Product.findOne({ id: id })
                .then(p => {
                    if (p)
                        product = p
                })

            if (req.file) {
                image = req.file.path.split("\\").slice(1).join("/")
                unlink(path.join(__dirname, '../public/' + product.image))
            }

            await Product.updateOne({ id: id }, {
                name: name,
                type: type,
                price: price,
                oldPrice: oldPrice,
                image: image || product.image
            })
                .then(() => {
                    return res.json({ code: 0, message: "success"})
                })
                .catch(err => {
                    res.render("error")
                })
        }
    }

    async deleteProduct(req, res) {
        const id = req.query.id

        await Product.findOne({ id: id })
            .then(async product => {
                await Product.deleteOne({ id: id })
                    .then(() => {
                        unlink(path.join(__dirname, '../public/' + product.image))
                        return res.json({
                            code: 0,
                            message: "success"
                        })
                    })
                    .catch(err => {
                        return res.json({
                            code: 1,
                            message: err
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

}


module.exports = new AdminController()
