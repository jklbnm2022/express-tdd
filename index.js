const express = require("express");
const logger = require("morgan");
const bodyParser = require('body-parser');
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = 3000;

let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

// 다른 사람이 만든 미들웨어 써보기 - morgan

function commonMiddleware(res, req, next) {
  console.log("common");
  next(new Error("error ouccered"));
}

// 에러 미들웨어
function errorMiddleware(err, req, res, next) {
  // 에러를 처리하거나 넘겨줌
  console.log(err.message);
  next();
}

// 라우팅 - 요청 url에 대해 적절한 핸들러 함수로 연결해주는 기능

// req(요청): req.params() req.query() req.body() 메소드를 주로 사용
// 요청 정보를 빼내기 쉽다.

// res(응답): res.send(`문자열 응답`) res.status(상태코드) res.json(json 보내줌)

app.get(`/`, function (req, res) {
  res.send("Hello world!\n");
});

app.get("/users", function (req, res) {
  const limit = parseInt(req.query.limit ?? 10, 10);
  const offset = parseInt(req.query.offset ?? 0, 10);
  if (Number.isNaN(limit) || Number.isNaN(offset)) {
    return res.status(400).end();
  }

  res.json(users.slice(offset, offset + limit));
});

app.get("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

app.post("/users", function (req, res) {
  const name = req.body.name;
  const id = Date.now();
  const obj = { id, name };

  if (!name) {
    return res.status(400).end()
  }

  if (users.find(user => user.name === name)) {
    return res.status(409).end()
  }

  users.push(obj);
  res.json(obj).status(201);
});

app.delete("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end()
  }

  // id 기준으로 삭제
  users = users.filter(user => user.id !== id);

  res.status(204).end()
})

app.listen(PORT, function () {
  console.log(`Server is running in Port:${PORT}`);
});

module.exports = app;
