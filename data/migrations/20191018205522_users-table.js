exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl.integer("age");
    tbl.string("gender");
    tbl.string("birthday");
    tbl.string("location");
    tbl.string("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
