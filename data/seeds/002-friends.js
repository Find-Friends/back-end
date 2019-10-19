exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("friends")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("friends").insert([
        {
          requestID: 1,
          currentID: 2,
          message: "Let us be friends!",
          email: "ab@gmail.com"
        },
        {
          requestID: 1,
          currentID: 3,
          message: "Let us be friends!",
          email: "bc@gmail.com"
        },
        {
          requestID: 1,
          currentID: 4,
          message: "Let us be friends!",
          email: "cd@gmail.com"
        },

        {
          requestID: 2,
          currentID: 3,
          message: "Let us be friends!",
          email: "ab@gmail.com"
        },
        {
          requestID: 2,
          currentID: 5,
          message: "Let us be friends!",
          email: "bc@gmail.com"
        },
        {
          requestID: 2,
          currentID: 1,
          message: "Let us be friends!",
          email: "cd@gmail.com"
        },

        {
          requestID: 3,
          currentID: 5,
          message: "Let us be friends!",
          email: "ab@gmail.com"
        },
        {
          requestID: 3,
          currentID: 4,
          message: "Let us be friends!",
          email: "bc@gmail.com"
        },
        {
          requestID: 3,
          currentID: 2,
          message: "Let us be friends!",
          email: "af@gmail.com"
        },

        {
          requestID: 4,
          currentID: 1,
          message: "Let us be friends!",
          email: "ab@gmail.com"
        },
        {
          requestID: 4,
          currentID: 3,
          message: "Let us be friends!",
          email: "bc@gmail.com"
        },
        {
          requestID: 4,
          currentID: 2,
          message: "Let us be friends!",
          email: "cd@gmail.com"
        },

        {
          requestID: 5,
          currentID: 1,
          message: "Let us be friends!",
          email: "a@gmail.com"
        },
        {
          requestID: 5,
          currentID: 3,
          message: "Let us be friends!",
          email: "a@gmail.com"
        },
        {
          requestID: 5,
          currentID: 4,
          message: "Let us be friends!",
          email: "a@gmail.com"
        }
      ]);
    });
};
