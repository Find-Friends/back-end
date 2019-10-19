exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username")
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("firstName").notNullable();
      tbl.string("lastName").notNullable();
      tbl.integer("age");
      tbl.string("gender");
      tbl.string("location");
      tbl.string("description");
    })
    .createTable("friends", tbl => {
      tbl
        .integer("requestID")
        .notNullable()
        .references("id")
        .inTable("users");
      tbl
        .integer("currentID")
        .notNullable()
        .references("id")
        .inTable("users");
      tbl.primary(["requestID", "currentID"]);
      tbl
        .bool("accepted")
        .notNullable()
        .defaultTo(false);
      tbl.string("message").notNullable();
      tbl.string("email").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friends").dropTableIfExists("users");
};
