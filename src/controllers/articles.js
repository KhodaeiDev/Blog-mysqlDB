const slugify = require("slugify");
const articles = require("./../repositories/articles");

exports.getAll = async (req, res, next) => {
  try {
    // Coding
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    let { title, content, slug, author_id, cover = null } = req.body;

    author_id = req.user.id;
    slug = slugify(slug, { lower: true });

    if (req.file.filename) {
      cover = req.file.filename;
    }

    await articles.create({ title, content, slug, author_id, cover });

    return res.status(201).json("Article created successfully");
  } catch (err) {
    next(err);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    // Coding
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    // Coding
  } catch (err) {
    next(err);
  }
};
