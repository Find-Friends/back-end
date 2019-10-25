const db = require("../data/dbConfig.js");

const Users = require("./users-model");

it("should set environment to testing", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

beforeEach(async () => {
  await db("users").truncate();
});

// Insert User from DB Tests
describe("Insert User", () => {
  it("Database is empty", async () => {
    const dbUsers = await db("users");
    expect(dbUsers.length).toBe(0);
  });

  it("Database has a length of 2 after inserting", async () => {
    await Users.insert({
      username: "test",
      password: "test",
      firstName: "test",
      lastName: "test"
    });
    await Users.insert({
      username: "james",
      password: "test",
      firstName: "James",
      lastName: "Test"
    });
    const dbUsers = await db("users");
    expect(dbUsers.length).toBe(2);
  });

  it("should insert the provided user into the db", async () => {
    await Users.insert({
      username: "james",
      password: "test",
      firstName: "james",
      lastName: "test"
    });
    let user = await Users.getBy({ firstName: "james" });
    expect(user.firstName).toBe("james");
  });
});

// Update User in DB test
describe("Update User", () => {
  it("should insert the provided user into the db", async () => {
    await Users.insert({
      username: "james",
      password: "test",
      firstName: "james",
      lastName: "test"
    });
    let user = await Users.getBy({ firstName: "james" });

    let updatedUser = await Users.update(
      { id: user.id },
      { firstName: "James" }
    );
    expect(updatedUser.firstName).toBe("James");
  });
});

// Remove User from DB Test
describe("Remove A User", () => {
  it("Database has a length of 1 after inserting 2 and removing 1", async () => {
    await Users.insert({
      username: "test",
      password: "test",
      firstName: "test",
      lastName: "test"
    });

    await Users.insert({
      username: "james",
      password: "test",
      firstName: "james",
      lastName: "test"
    });

    let user = await Users.getBy({ firstName: "test" });
    await Users.deleteUser({ id: user.id });
    const dbUsers = await db("users");
    expect(dbUsers.length).toBe(1);
  });
});
