const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "DarkLord",
          password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
          firstName: "Harry",
          lastName: "Potter",
          age: 14,
          gender: "Male",
          location: "USA",
          description: "I am the Dark Lord"
        },
        {
          username: "Bones",
          password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
          firstName: "Jerry",
          lastName: "Black",
          age: 15,
          gender: "Female",
          location: "Ireland",
          description: "I am a dog"
        },
        {
          username: "Sarah",
          password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
          firstName: "Ben",
          lastName: "Lord",
          age: 17,
          gender: "Female",
          location: "France",
          description: "I have no friends. Be my first!"
        },
        {
          username: "Jonas",
          password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
          firstName: "Winston",
          lastName: "Peterson",
          age: 13,
          gender: "Female",
          location: "NY",
          description: "Friends are forever!"
        },
        {
          username: "FlipperHots",
          password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
          firstName: "Gabriella",
          lastName: "Smith",
          age: 20,
          gender: "Male",
          location: "USA",
          description: "I am so cool. Be my friend!"
        }
      ]);
    });
};
