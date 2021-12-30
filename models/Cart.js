const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    email: String,
    totalPrice: Number,
    product: Array,
})

module.exports = mongoose.model('Cart', Cart)

