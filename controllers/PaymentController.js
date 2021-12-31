const Product = require("../models/Product")
const Cart = require("../models/Cart")
const Order = require("../models/Order")
const User = require("../models/User")

class PaymentController {
    async payment(req, res) {
        const id = req.params.id

        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        if (!id) return res.json({ code: 1, message: "id sai" })

        let toppings = []

        await Product.findOne({ id: id })
            .then(async product => {
                if (product) {
                    await Product.find({})
                        .then(products => {
                            products.forEach(product => {
                                if (product.type === 5) // topping
                                    toppings.push(product)
                            })
                            return res.json({ code: 0, message: "success", product: product, toppings: toppings })
                        })
                } else {
                    return res.json({ code: 1, message: "id sai" })
                }
            })
    }

    async addCart(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        const cart = req.body
        let price = 0
        let toppings = []
        let totalPrice = 0

        if (cart.toppings.length > 0)
            for (let j = 0; j < cart.toppings.length; j++) {
                price += JSON.parse(cart.toppings[j]).price

                await Product.findOne({ id: JSON.parse(cart.toppings[j]).id })
                    .then(topping => {
                        toppings.push(topping)
                    })
            }

        await Product.findOne({ id: cart.product_id })
            .then(product => {
                if (product) {
                    cart.product_info = product
                    cart.toppings_info = toppings
                    price += product.price
                }
            })

        price *= cart.amount

        await Cart.findOne({ email: req.session.email })
            .then(async c => {
                if (c) {
                    const cartProduct = c.product
                    cartProduct.push(cart)

                    for (let i = 0; i < cartProduct.length; i++) {
                        totalPrice += (cartProduct[i].price * cartProduct[i].amount)
                    }

                    await Cart.updateOne({ email: req.session.email }, {
                        totalPrice: totalPrice,
                        product: cartProduct
                    })
                } else {
                    const cartObj = {
                        email: req.session.email,
                        totalPrice: (cart.price * cart.amount),
                        product: cart
                    }

                    const cartDB = new Cart(cartObj)
                    cartDB.save()
                }
            })
            .catch(err => console.log(err))

    }

    async deleteCartId(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        const id = req.params.id

        if (!id) {
            return res.json({ code: 1, message: "id sai" })
        }

        await Cart.findOne({ email: req.session.email })
            .then(async carts => {
                for (let i = 0; i < carts.product.length; i++) {
                    if (id === carts.product[i].product_id) {
                        carts.totalPrice -= (carts.product[i].amount * carts.product[i].price)
                        carts.product.splice(i, 1)
                        break
                    }
                }

                await Cart.updateOne({ email: req.session.email }, { product: carts.product, totalPrice: carts.totalPrice })
                    .then(() => res.json({ code: 0, message: "success" }))
                    .catch(err => res.json({ code: 1, message: err.message }))
            })
    }

    async deleteCart(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        await Cart.deleteOne({ email: req.session.email })
            .then(() => res.json({ code: 0, message: "success" }))
            .catch(err => res.json({ code: 1, message: err.message }))
    }

    async addOrder(req, res) {
        let customer 

        await User.findOne({ email: req.session.email})
        .then(user => {
            if (user) {
                customer = user
            }
        })

        await Cart.findOne({ email: req.session.email })
            .then(async cart => {
                if (cart) {
                    await Cart.deleteOne({ email: req.session.email })
                    const orderObj = {
                        email: req.session.email,
                        customer_info: customer,
                        cart: cart,
                        status: 1
                    }

                    const order = new Order(orderObj)
                    order.save()

                    return res.json({ code: 0, message: "success" })
                } else {
                    res.json({ code: 1, message: "Chưa có gì trong giỏ hàng" })
                }
            })
    }
}

module.exports = new PaymentController()
