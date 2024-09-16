const express = require("express");
const controller = require("./../controllers/auth");
const { loginSchema, registerSchema } = require("../validators/auth");
const validator = require("./../middleware/validator");

const router = express.Router();

router.route("/register").post(validator(registerSchema), controller.register);
router.route("/login").post(validator(loginSchema), controller.login);
router.route("/refresh").post(controller.refresh);
router.route("/me").post(controller.getMe);
router.route("/loguot").post(controller.logOut);

module.exports = router;
