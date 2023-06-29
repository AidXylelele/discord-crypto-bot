const knex = require("knex")({
  client: "mysql2",
  version: "5.7",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "admin",
    password: "Qwerty123",
    database: "myapp_test",
  },
});

module.exports = { knex };
