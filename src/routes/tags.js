const express = require("express");
const controller = require("./../controllers/tags");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);
router.route("/remove/:id").delete(controller.remove);

module.exports = router;
