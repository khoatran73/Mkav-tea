const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const User = new Schema({
    name: String,
    email: { type: String, unique: true },
    image: String,
    hash: String,
    salt: String
})

User.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`)
}

User.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`)

    return this.hash === hash
}

module.exports = mongoose.model('User', User)

