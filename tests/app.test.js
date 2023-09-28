/** test file for app.js */

const request = require("supertest");
const app = require("../app");

describe("Basic Setup: PNPACAT Online Application System REST API", () => {
  it("Test file properly running", () => {
    /** auto-pass */
  });

  it("Can register as user", () => {
    /** auto-pass */
    return request(app)
      .post("/users/new")
      .send({
        lastname: "Dela Cruz",
        givenname: "Juan",
        middlename: "Cortez",
        qualifier: "Jr.",
        bdate: "2002-03-15",
        email: "jcjrdelax@gmail.com",
        password: "dxjuan0315",
        address: {
          home: "N.A.",
          brgy: "01010101",
          city: "010101",
          prov: "0101",
          region: "01",
        },
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: 201,
            message: expect.any(String),
            userid: expect.any(Number),
          })
        );
      });
  });

  it("Denies incomplete registration data", () => {
    return request(app)
      .post("/users/new")
      .send({
        lastname: "Dela Cruz",
        givenname: "Juan",
        middlename: "",
        qualifier: "Jr.",
        bdate: "2002-03-15",
        email: null,
        password: "dxjuan0315",
        address: {
          home: "N.A.",
          brgy: "01010101",
          city: "010101",
          prov: "0101",
          region: "01",
        },
      })
      .expect(422)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: 422,
            message: expect.any(String),
          })
        );
      });
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

  it("Can get user information via user id", () => {
    /** autopass */
    return request(app)
      .get("/users/info/2023000001")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("Handles non-existent user ids", () => {
    return request(app)
      .get("/users/info/2023999999")
      .expect(404)
      .expect("Content-Type", /json/);
  });
});
