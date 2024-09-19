const db = require("./../db");

const create = async (title) => {
  try {
    const query = " INSERT INTO tags (title) VALUES (?)";

    const [insertTag] = await db.execute(query, [title]);

    const userQuery = "SELECT * FROM tags WHERE id =?";
    const [tag] = await db.execute(userQuery, [insertTag.insertId]);

    return tag[0];
  } catch (err) {
    throw err;
  }
};

const findByTitle = async (title) => {
  try {
    const query = " SELECT * FROM tags where title = ?";

    const [tag] = await db.execute(query, [title]);

    return tag[0];
  } catch (err) {
    throw err;
  }
};

const findAll = async () => {
  try {
    const query = " SELECT * FROM tags";

    const [tag] = await db.execute(query);

    return tag;
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    const query = " DELETE FROM tags WHERE id = ?";

    await db.execute(query, [id]);

    return true;
  } catch (err) {
    throw err;
  }
};

const update = async (id, title) => {
  try {
    const query = " UPDATE tags SET title = ? WHERE id = ?";

    await db.execute(query, [title, id]);

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  create,
  findByTitle,
  findAll,
  remove,
  update,
};
