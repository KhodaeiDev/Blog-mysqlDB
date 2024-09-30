const slugify = require("slugify");
const Articles = require("./../repositories/articles");
const Tag = require("./../repositories/tags");
const { calculateRelativeTimeDifference } = require("../uilts/funcs");

exports.getAll = async (req, res, next) => {
  try {
    // Coding
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    let { title, content, slug, author_id, cover = null, tagsId } = req.body;

    author_id = req.user.id;
    slug = slugify(slug, { lower: true });

    if (req.file?.filename) {
      cover = req.file.filename;
    }

    const article = await Articles.create({
      title,
      content,
      slug,
      author_id,
      cover,
    });

    tagsId?.forEach(async (tagId) => {
      await Articles.addTag(article.id, Number(tagId));
    });

    return res.status(201).json("Article created successfully");
  } catch (err) {
    next(err);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const tagTitle = req.params.slug;

    const tag = await Tag.findByTitle(tagTitle);
    if (!tag) {
      return res.status(400).json("Tag Not Found");
    }

    const articles = await Articles.findTagArticles(tag.id);
    if (articles.length < 1) {
      return res.status(400).json("There are no articles for this tag");
    }

    articles.forEach((article) => {
      article.created_at = calculateRelativeTimeDifference(article.created_at);
    });

    return res.json(articles);
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

exports.search = async (req, res) => {
  const searchValue = req.query.value;

  const articles = await Articles.searchInArticles(searchValue);
  if (articles.length < 1) {
    res.status(404).json("Articles Not Found");
  }

  return res.json(articles);
};
