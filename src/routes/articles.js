const express = require("express");
const controller = require("./../controllers/articles");
const auth = require("./../middleware/auth");
const path = require("path");
const { multerStorage } = require("./../middleware/uploader");

const router = express.Router();

const upload = multerStorage(path.join(__dirname, "../../public/images/cover"));

router
  .route("/")
  .get(controller.getAll)
  .post(auth, upload.single("cover"), controller.create);

router.route("/:slug").get(controller.getBySlug);

router.route("/remove/:id").post(controller.remove);

module.exports = router;
