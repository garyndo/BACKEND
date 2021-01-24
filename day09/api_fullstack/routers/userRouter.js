//NOTE ada 4 bagian penting dalam mmbuat router

//1.import router dari express
const router = require('express').Router()

// FOR REGISTER, express validator
const { body, validationResult } = require('express-validator')

//2.import controller
const { userController } = require('../controllers')

//FOR REGISTER, express validator/ register validation sebagai middleware sebelum user regist masuk k regvalidation dl
const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username can\'t empty')
        .isLength({ min: 6 })
        .withMessage('Username must have 6 character'),
    body('password')
        .notEmpty()
        .withMessage('Password can\'t empty')
        .isLength({ min: 6 })
        .withMessage('Password must have 6 character')
        .matches(/[0-9]/)
        .withMessage('Password must include number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must include symbol'),
    body('email')
        .isEmail()
        .withMessage('Invalid email')
]

//3.create router
router.get('/getAllUsers', userController.getAlluser)
router.post('/login', userController.login)
router.put('/register', registerValidation, userController.register)
//4.export router
module.exports = router