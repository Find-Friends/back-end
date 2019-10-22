const request = require("supertest");

const db = require("../data/dbConfig.js");

const bcrypt = require("bcryptjs");

// the data access file we are testing
const server = require("../api/server");

describe("POST /register", function() {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db("users").truncate();
  });

  it("responds with 201", function(done) {
    request(server)
      .post("/api/auth/register")
      .send({
        username: "jane",
        password: "field",
        firstName: "Jane",
        lastName: "Field"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("responds with 400 with incorrect body", function(done) {
    request(server)
      .post("/api/auth/register")
      .send({ fdssd: "jofdfdfdfhn", password: "fanmes" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /login", function() {
  it("202 with correct login", function(done) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("Test", salt);

    return db("users")
      .insert({
        username: "Test",
        password: hash,
        firstName: "Test",
        lastName: "Ligament"
      })
      .then(() => {
        request(server)
          .post("/api/auth/login")
          .send({ username: "Test", password: "Test" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(202)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });
  });

  it("responds with 400 with incorrect credentials", function(done) {
    request(server)
      .post("/api/auth/login")
      .send({ usernasdadfsame: "Test", password: "fun" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("responds with 401 with incorrect credentials", function(done) {
    request(server)
      .post("/api/auth/login")
      .send({ username: "Test", password: "fun" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
