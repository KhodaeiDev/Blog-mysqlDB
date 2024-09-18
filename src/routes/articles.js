const express = require("express");
const controller = require("./../controllers/articles");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);

router.route("/:slug").get(controller.getBySlug);

router.route("/remove/:id").post(controller.remove);

module.exports = router;
