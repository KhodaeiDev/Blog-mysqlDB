const db = require("./../db");

const create = async ({ name, username, email, password }) => {
  const query =
    "INSERT INTO users (name , username , email , password) VALUES (?,?,?,?)";

  const [user] = db.execute(query, [name, username, email, password]);

  return user[0];
};

const findByUsername = async ({ username }) => {
  const query = "SELECT * FROM users WHERE username = ?";

  const [user] = db.execute(query, [username]);

  return user[0];
};

const findById = async ({ id }) => {
  const query = "SELECT * FROM users WHERE id = ?";

  const [user] = db.execute(query, [id]);

  return user[0];
};

module.exports = {
  create,
  findById,
  findByUsername,
};
