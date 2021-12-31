const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    email: String,
    customer_info: Object,
    cart: Object,
    status: Number, //0: Đã giao hàng, 1: Đang xử lí, 2: Đang giao hàng, 3: Bị từ chối
}, { timestamps: true })

module.exports = mongoose.model('Order', Order)

