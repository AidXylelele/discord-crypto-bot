module.exports = {
  development: {
    client: "mysql2",
    version: "8.0.33",
    connection: {
      host : 'db',
      port : 3306,
      user: "admin",
      password: "Qwerty123",
      database: "application",
    },
    migrations: {
      directory: "./src/db/migrations",
    },
  },
};
