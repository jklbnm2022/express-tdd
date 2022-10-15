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

describe("DELETE /users/:id 는", () => {
  describe('성공 시', () => {
    it('204를 응답한다.', (done) => {
      request(app).delete('/users/1').expect(204).end(done)
    })
  })

  describe("실패 시:", () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app).delete('/users/asduihui').expect(400).end(done)
    })
  })
})


describe("POST /users 는", () => {
  describe('성공 시', () => {
    let body;
    let id;
    const name = 'daniel'
    before(done => {
      request(app).post('/users').send({ name }).expect(201).end((err, res) => {
        body = res.body
        id = body.id
        done()
      })
    })
    after(done => {
      request(app).delete(`/users/${id}`).end(done)
      console.log("생성한 유저 삭제 완료.")
    })
    it('생성된 유저 객체를 반환한다.', () => {
      body.should.have.property('id')
    })
    it('입력한 name을 반환한다', () => {
      body.should.have.property('name', name)
    })
  })

  describe('실패 시', () => {
    let body;
    const name = `daniel`
    before(done => {
      request(app).post('/users').send({ name }).expect(201).end((err, res) => {
        body = res.body
        done()
      })
    })

    it("name 파라미터 누락시 400을 반환한다", (done) => {
      request(app).post('/users').expect(400).end(done)
    })

    it("name이 중복일 시 409를 반환한다.", (done) => {
      request(app).post('/users').send({ name }).expect(409).end(done)
    })
  })

})

describe('PUT /users/:id 는', () => {
  describe('성공 시', () => {
    let id;
    let body;
    const name = `${Date.now()}`;

    before(done => {
      // user 조회
      request(app).post('/users').send({ name }).end((err, res) => {
        body = res.body;
        id = body.id;
        done()
      })
    })

    it('바뀐 이름이 적용된다.', (done) => {
      // 바뀐 name 
      request(app).put(`/users/${id}`).send({ name: `${name}${name}` }).end((err, res) => {
        res.body.should.have.property('name', `${name}${name}`)
        done()
      })
    })
  })

  describe('실패 시', () => {
    let id;
    let body;
    let name = Date.now();
    let conflictName = Date.now() + 'conflict';
    before(done => {
      const rq = request(app)
      // user 생성
      rq.post('/users').send({ name }).end((err, res) => {
        body = res.body;
        id = body.id;
        rq.post('/users').send({ name: conflictName }).end(done)
      })
    })

    it('정수가 아닌 id일 경우 400응답', (done) => {
      request(app).put(`/users/asuidiofsdjsdf`).send({ name }).expect(400).end(done)
    })

    it('name이 없을 경우 400 응답', (done) => {
      request(app).put(`/users/${id}`).send({ name: '' }).expect(400).end(done)

    })

    it('없는 유저일 경우 404 응답', (done) => {
      console.log({ id, body })
      request(app).put(`/users/${id + id}`).send({ name }).expect(404).end(done)
    })

    it('이름이 중복일 경우 409 응답', (done) => {
      request(app).put(`/users/${id}`).send({ name: conflictName }).expect(409).end(done)

    })

  })
})