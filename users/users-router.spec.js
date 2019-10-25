const request = require("supertest");
const server = require("../api/server"); // the express server

/*
  declare the token variable in a scope accessible
  by the entire test suite
*/
let token;

beforeAll(done => {
  return request(server)
    .post("/api/auth/register")
    .send({
      username: Date.now(),
      password: "test",
      firstName: "Sam",
      lastName: "Gamgee"
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

it("should set environment to testing", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("GET /api/users/:id", () => {
  // token not being sent - should respond with a 400
  test("It should require authorization", () => {
    return request(server)
      .get("/api/users")
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  // it should respond with a 401 if the token is incorrect
  test("It should require authorization", () => {
    return request(server)
      .get("/api/users")
      .set("Authorization", `asdfadsewaaew`)
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test("It responds with status code of 200 for put request", () => {
    return request(server)
      .put("/api/users/1")
      .send({ username: "first" })
      .set("Authorization", `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  test("It responds with JSON", () => {
    return request(server)
      .get("/api/users/1")
      .set("Authorization", `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });

  test("It responds with 404 for undefined id", () => {
    return request(server)
      .get("/api/users/200")
      .set("Authorization", `${token}`)
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
});
