const siteRouter = require('./site')
const userRouter = require('./user')
const orderRouter = require('./order')
const adminRouter = require('./admin')
const customerCareRouter = require('./customer-care')

module.exports = function route(app) {
    app.use("/", siteRouter)
    app.use("/user", userRouter)
    app.use("/order", orderRouter)
    app.use("/admin", adminRouter)
    app.use("/customer-care", customerCareRouter)
}