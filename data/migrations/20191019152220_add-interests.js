exports.up = function(knex) {
  return knex.schema.table("users", function(table) {
    table.json("interests");
  });
};

exports.down = function(knex) {
  return knex.schema.table("users", function(table) {
    table.dropColumn("interests");
  });
};
