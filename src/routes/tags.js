const express = require("express");
const controller = require("./../controllers/tags");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.route("/").get(controller.getAll).post(auth, isAdmin, controller.create);
router.route("/remove/:id").delete(auth, isAdmin, controller.remove);
router.route("/update").put(controller.update);

module.exports = router;
