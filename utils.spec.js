// spec : 명세

const should = require('should');
const utils = require("./utils");

describe("utils.js 모듈의 capitalize 함수는", () => {
  it("문자열의 첫번째 문자를 대문자로 변환한다.", () => {
    // 실제 테스트 할 코드를 작성.
    const result = utils.capitalize("hello");
    result.should.be.equal('Hello')
  });
});
