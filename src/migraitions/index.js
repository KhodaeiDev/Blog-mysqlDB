const fs = require("fs");
const path = require("path");
const db = require("./../db");

const migrate = () => {
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

  try {
    db.query(userTableMigrate);
    db.query(tagsTableMigrate);
    db.query(articlesTableMigrate);
    db.query(articlesTagsTableMigrate);
  } catch (err) {
    throw err;
  }
};

migrate();
