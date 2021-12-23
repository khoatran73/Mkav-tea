const siteRouter = require('./site')
const userRouter = require('./user')
const productRouter = require('./product')

module.exports = function route(app) {
    app.use("/", siteRouter)
    app.use("/user", userRouter)
}