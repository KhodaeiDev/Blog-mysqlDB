const db = require("./../db");

const create = async ({ title, content, slug, author_id }) => {
  const insertQuery = "INSERT INTO articles VALUES (?, ?, ?, ?)";

  const [insertedArticle] = await db.execute(insertQuery, [
    title,
    content,
    slug,
    author_id,
  ]);

  const mainArticles = await db.execute("SELECT * FROM articles WHERE id = ?", [
    insertedArticle.insertId,
  ]);

  return mainArticles;
};

const addTag = async (articleId, tagId) => {
  try {
    const query = "INSERT INTO articles_tags VALUES (?, ?)";

    await db.execute(query, [articleId, tagId]);

    return true;
  } catch (err) {
    return false;
  }
};

const deleteOne = async (id) => {
  try {
    const query = "DELETE FROM articles WHERE id = ?";
    await db.execute(query, [id]);

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  create,
  addTag,
  deleteOne,
};
