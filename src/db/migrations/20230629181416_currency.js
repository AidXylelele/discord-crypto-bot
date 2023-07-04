exports.up = function (knex) {
  return knex.schema.createTable("currencies", function (table) {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
    table.string("price").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("currencies");
};
