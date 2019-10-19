const knex = require("knex");

const config = require("../knexfile");

const environment = process.env.DB_ENV || "development";

module.export = knex(config[environment]);
