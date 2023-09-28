/** test file for app.js */

const request = require("supertest");
const app = require("../app");

describe("Basic Setup: PNPACAT Online Application System REST API", () => {
  it("Test file properly running", () => {
    /** auto-pass */
  });

  it("Can register as user", () => {
    /** auto-pass */
  });

  it("Can login as user", () => {
    /** auto-pass */
    return request(app)
      .post("/users/login")
      .send({
        username: "admin",
        password: "admin",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: expect.any(Number),
            message: expect.any(String),
            sessionKey: expect.any(String),
            userid: expect.any(Number),
          })
        );
      });
  });

  it("Denies errant login user credentials", () => {
    /** auto-pass */
    return request(app)
      .post("/users/login")
      .send({
        username: "nonExistentUsername",
        password: "nonExistentPassword",
      })
      .expect("Content-Type", /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: expect.any(Number),
            message: expect.any(String),
            sessionKey: null,
            userid: null,
          })
        );
      });
  });
});
