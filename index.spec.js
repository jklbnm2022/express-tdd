const app = require("./index");
const should = require("should");
const request = require("supertest");

describe("GET /users 는", () => {
  describe("성공 시", () => {
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          // 콜백함수 비동기처리
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다.", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          console.log(res.body);
          // 콜백함수 비동기처리
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("limit이 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app).get("/users?limit=hello").expect(400).end(done);
    });

    it("offset이 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app).get("/users?offset=hello").expect(400).end(done);
    });
  });
});

describe("GET /users/:id 는", () => {
  describe("성공 시", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).get(`/users/adsjio`).expect(400).end(done);
    });

    it("id로 유저를 찾을 수 없는 경우 404로 응답한다.", (done) => {
      request(app).get(`/users/12389203890`).expect(404).end(done);
    });
  });
});
