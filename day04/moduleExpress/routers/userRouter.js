//import express beserta routernya
//method router dari exprees berguna untuk mmbuat router
const router = require('express').Router()

// use body for express validator
const { body } = require('express-validator')

//import controller yg d butuhkan 
const { user } = require('../controllers')

const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('username can\'t empty')
        .isLength({ min: 6 })
        .withMessage('username must have min 6 char'),
    body('password')
        .notEmpty()
        .withMessage('Password can\'t empty)
        .isLength({min:6})
        .withMessage('username must have min 6 char')
        .matches(/[0-9]/)
        .withMessage('Password must include number')
        .matches(/[!@#$%^&*]/)
        .withMessage('password must include symbol'),
    body('email')
        .isEmail()
        .withMessage('Invalid email')
    ]

//create router 
//dalam kasus API method bsa d ganti post semua, jd ga perlu get patch put delete, bs d ganti post semua
router.post('/getUser', user.getUser)
router.post('/login', user.login)
router.post('/register', registerValidation, user.register)
router.post('/edit/:id', user.edit)
router.post('/delete/:id', user.delete)

//export router
module.exports = router
