const express = require("express");
const controller = require("./../controllers/articles");
const auth = require("./../middleware/auth");
const isAdmin = require("./../middleware/isAdmin");
const path = require("path");
const { multerStorage } = require("./../middleware/uploader");

const router = express.Router();

const upload = multerStorage(path.join(__dirname, "../../public/images/cover"));

router
  .route("/")
  .get(controller.getAll)
  .post(auth, isAdmin, upload.single("cover"), controller.create);

router.route("/search").get(controller.search);
router.route("/:slug").get(controller.getBySlug);

router.route("/remove/:id").post(auth, isAdmin, controller.remove);

module.exports = router;
