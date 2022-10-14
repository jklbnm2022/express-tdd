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