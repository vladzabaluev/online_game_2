const Router = require('express')
const router = new Router()
const controller = require ( '../controllers/authController')
const {check} = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post('/registration', [
    check('userName', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен содержать в себе больше 7 и меньше 15 символов").isLength({min: 7, max:15})
], controller.registration)
router.post('/login', controller.login)
router.get('/users',roleMiddleware(["ADMIN"]) ,controller.getUsers)

module.exports = router