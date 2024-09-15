const app = require("./app");
const db = require("./db");
const configs = require("./config");

async function startServer() {
  try {
    await db.getConnection();

    app.listen(configs.port, () => {
      console.log(`Server Running on Port ${configs.port}`);
    });
  } catch (err) {
    console.log("err ->", err);
    await db.end();
  }
}

startServer();
