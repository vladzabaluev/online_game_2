const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const gameController = require("../controllers/gameController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/registration",
  [
    check("userName", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен содержать в себе больше 7 и меньше 15 символов").isLength({ min: 7, max: 15 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/auth", authMiddleware, controller.auth);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.post("/win", authMiddleware, gameController.changeWinCount);
router.post("/constils", gameController.constils);
router.post("/changeNickname", authMiddleware, gameController.changeNickName);

module.exports = router;
