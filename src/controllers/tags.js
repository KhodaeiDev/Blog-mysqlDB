const Tag = require("./../repositories/tags");

exports.getAll = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();

    return res.json(tags);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title } = req.body;

    const tag = await Tag.create(title);

    return res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Tag.remove(id);

    return res.json({ msg: "Tag removed successfully" });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id, title } = req.body;

    await Tag.update(id, title);

    return res.json({ msg: "Tag updated successfully" });
  } catch (err) {
    next(err);
  }
};
