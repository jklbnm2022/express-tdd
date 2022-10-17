# 테스트 주도 개발 (Test driven development)

테스트코드 먼저 만들고. 그거 통과해나가며 하나하나 만드는 것.
물론 TDD 하면 개발시간 많이 걸림. 하지만 유지보수 시점에 가면 TDD 개발이 큰 효과. 개발보다 유지보수 시간 많이걸리는데, TDD 하면 그 시간 아낄 수 있음.

- mocha, should, superTest

## [mocha](https://mochajs.org)

- 테스트 코드를 돌려주는 테스트 러너.
  - 테스트 수트: 테스트 환경으로, 모카에서는 describe()으로 구현한다.
  - 테스트 케이스: 실제 테스트를 말하며, 모카에서는 it()으로 구현한다.
    - 동일 여부 등을 판단할 때는 node 에 내장된 assert 를 사용
- npm i --save-dev mocha
  - 왜냐하면 개발환경에서만 필요한 라이브러리이기 때문이다.

## [should](https://github.com/shouldjs/should.js)

- node 의 assert 와 같은 검증(assertion) 라이브러리.
- 가독성 높은 테스트 코드를 만들 수 있다.

## [SuperTest](https://www.npmjs.com/package/supertest)

- 단위 테스트: 함수의 기능 테스트
- 통합 테스트: API 의 기능 테스트
- 슈퍼테스트는 익스프레스 통합 테스트용 라이브러리.
  - 내부적으로 express server 를 구동시켜 실제 요청을 보낸 뒤 결과를 검증.

### 지금까지 드는 생각

- 실무에서는 jest 를 쓰는 것 같던데. typescript 도 아닌 javascript 로 만들고 있는 게 조금 실무와 멀어보이기는 한다.
- 그렇지만 프론트 공부 할 때 과거 프레임워크의 개발사를 아는 게 현재 프레임워크를 이해하는데 도움을 주었던 것처럼, mocha, should, supertest 를 이해한다면 jest를 보다 쉽고 빠르게 익힐 수 있을 것이라는 기대가 생긴다. TDD 를 한 번도 안 해 본 입장에서는 이렇게 배워가는 게 더 편할지도 모르겠다는 생각도 든다.

# 해야 할 일

- express 에 typescript 얹어보기
- mocha, should, superTest 로 만든 테스트코드를 jest 로 재구축 해 보기

## express 공부

- express 는 body 를 지원하지 않아서, 파싱을 해야 하고, 외부 모듈이 필요하다.
  - body-parser: 글자같은 거. 미들웨어 형태로 추가해주면 됨.
  - multer: 이미지 같은 큰 데이터
- 라우팅 - 요청 url에 대해 적절한 핸들러 함수로 연결해주는 기능

- req(요청): req.params() req.query() req.body() 메소드를 주로 사용
  - 요청 정보를 빼내기 쉽다.
- res(응답): res.send(`문자열 응답`) res.status(상태코드) res.json(json 보내줌)

## user PUT 공부하던 중 잡생각

- POST, PUT 모두 하드코딩하는 건 마음에 안 든다. 특히 PUT 에서 주는 id와 name 을 하드코딩으로 넣고 어림짐작으로 때려맞추는 거는 나중에 수정 안되면 나쁠 것 같다. 자동화하려면 되도록 알아서 되게 해야한다.
- 무튼 그런고로 PUT 을 하면서 요청을 chain 해서 보내는 방법을 찾느라 고생했다. async await 하면 편한데 지금 강의 보는 거 생각하면 일단은 promise chain 따라가는 게 맞는 것 같아서 그랬다. 잘 못찾다가 스택오버플로우 에서 [정답](https://stackoverflow.com/questions/21089842/how-to-chain-http-calls-with-superagent-supertest)을 찾았다.
