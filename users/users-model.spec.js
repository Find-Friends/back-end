const db = require("../data/dbConfig.js");

const Users = require("./users-model");

it("should set environment to testing", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

beforeEach(async () => {
  await db("users").truncate();
});

describe("Insert User", () => {
  it("Database is empty", async () => {
    const dbUsers = await db("users");
    expect(dbUsers.length).toBe(0);
  });

  it("Database has a length of 1 after inserting", async () => {
    await Users.insert({
      username: "test",
      password: "test",
      firstName: "test",
      lastName: "test"
    });
    const dbUsers = await db("users");
    expect(dbUsers.length).toBe(1);
  });

  describe("GET /users/:id", () => {
    it("Users database has a length of 1", async () => {
      await Users.insert({
        username: "jane",
        password: "jane",
        firstName: "jane",
        lastName: "jane"
      });

      const dbResponse = await Users.getBy({ firstName: "jane" });
      expect(dbResponse.firstName).toBe("jane");
    });
  });
});
