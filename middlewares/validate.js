const { body } = require('express-validator')

const validate = [
    body('name').isLength({ min: 1 }).withMessage("Họ Tên không được để trống"),
    body('email').isLength({ min: 1 }).withMessage("Email không được để trống")
        .isEmail().withMessage("Sai định dạng email"),
    body('password').isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
    body('password2').isLength({ min: 6 }).withMessage("Mật khẩu nhập lại phải có ít nhất 6 ký tự"),
    body('password')
        .custom((value, { req }) => value === req.body.password2)
        .withMessage("Nhập lại mật khẩu không chính xác")
]

module.exports = validate
