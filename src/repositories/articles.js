const db = require("./../db");

const create = async ({ title, content, slug, author_id, cover }) => {
  const insertQuery =
    "INSERT INTO articles (title, content, slug, author_id , cover ) VALUES (?, ?, ?, ?,?)";

  const [insertedArticle] = await db.execute(insertQuery, [
    title,
    content,
    slug,
    author_id,
    cover,
  ]);

  const [mainArticles] = await db.execute(
    "SELECT * FROM articles WHERE id = ?",
    [insertedArticle.insertId]
  );

  return mainArticles[0];
};

const addTag = async (articleId, tagId) => {
  try {
    const query =
      "INSERT INTO articles_tags( article_id, tag_id ) VALUES (?, ?)";

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

const findTagArticles = async (tagId) => {
  const query = `SELECT
  articles.title,
  articles.content,
  articles.slug,
  articles.cover,
  articles.created_at,
  users.name AS author,
  tags.title AS tag
  FROM articles_tags
  JOIN articles ON
  articles_tags.article_id = articles.id
  JOIN users ON
  users.id = articles.author_id
  JOIN tags ON
  articles_tags.tag_id = tags.id
  WHERE tag_id = ?;`;

  const [articles] = await db.execute(query, [tagId]);

  return articles;
};

const searchInArticles = async (searchValue) => {
  const query = `SELECT
  articles.id,
  articles.title,
  articles.content,
  articles.slug,
  articles.cover,
  users.name AS author,
  tags.title AS tag
  FROM articles
  JOIN articles_tags ON
  articles_tags.article_id = articles.id
  JOIN tags ON
  articles_tags.tag_id = tags.id
  JOIN users ON
  users.id = articles.author_id
  WHERE articles.title LIKE ? OR content LIKE ? OR tags.title = ?
  GROUP BY articles.id;`;

  const [articles] = await db.execute(query, [
    `%${searchValue}%`,
    `%${searchValue}%`,
    `%${searchValue}%`,
  ]);

  return articles;
};

module.exports = {
  create,
  addTag,
  deleteOne,
  findTagArticles,
  searchInArticles,
};
