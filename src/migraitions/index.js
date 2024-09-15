const fs = require("fs");
const path = require("path");
const db = require("./../db");

const migrate = async () => {
  const connection = await db.getConnection();

  const userTableMigrate = fs.readFileSync(
    path.resolve(__dirname, "./users-ddl.sql"),
    "utf-8"
  );

  const tagsTableMigrate = fs.readFileSync(
    path.resolve(__dirname, "./tags-ddl.sql"),
    "utf-8"
  );

  const articlesTableMigrate = fs.readFileSync(
    path.resolve(__dirname, "./articles-ddl.sql"),
    "utf-8"
  );

  const articlesTagsTableMigrate = fs.readFileSync(
    path.resolve(__dirname, "./articles-tags-ddl.sql"),
    "utf-8"
  );

  await connection.beginTransaction();
  try {
    await connection.query(userTableMigrate);
    await connection.query(tagsTableMigrate);
    await connection.query(articlesTableMigrate);
    await connection.query(articlesTagsTableMigrate);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
  }
};

migrate()
  .then(() => console.log(`DB ran succesfully`))
  .catch(() => db.end());
