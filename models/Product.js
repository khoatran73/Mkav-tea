const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const Product = new Schema({
    id: {type: String, unique: true, require: true},
    name: String,
    image: String,
    price: Number,
    oldPrice: Number,
    type: Number, // 1: trà sữa, 2: fresh fruit tea, 3: macchiato, 4: sữa chua dẻo
    admin: String,
})

module.exports = mongoose.model('Product', Product)

