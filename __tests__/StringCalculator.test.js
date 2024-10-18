import StringCalculator from "../src/StringCalculator";

describe("StringCalculator", () => {
  describe("validateInput", () => {
    test("빈 문자열이 입력되면 에러를 발생시킨다", () => {
      const calculator = new StringCalculator();
      expect(() => calculator.validateInput("")).toThrow(
        "[ERROR] 입력값이 빈 문자열입니다."
      );
    });

    test("허용되지 않는 문자가 포함된 경우 에러를 발생시킨다", () => {
      const calculator = new StringCalculator();
      expect(() => calculator.validateInput("1,a,3")).toThrow(
        "[ERROR] 입력값에 허용되지 않는 문자가 포함되어 있습니다."
      );
    });

    test("정상적인 입력일 경우 에러가 발생하지 않는다", () => {
      const calculator = new StringCalculator();
      expect(() => calculator.validateInput("1,2:3")).not.toThrow();
      expect(() => calculator.validateInput("//^\n1^2^3")).not.toThrow();
      expect(() => calculator.validateInput("//;\n1")).not.toThrow();
    });
  });

  describe("extractCustomDelimiter", () => {
    test("커스텀 구분자를 추출한다", () => {
      const calculator = new StringCalculator();
      expect(calculator.extractCustomDelimiter("//;\n1;2;3")).toBe(";");
    });

    test("커스텀 구분자가 없으면 null을 반환한다", () => {
      const calculator = new StringCalculator();
      expect(calculator.extractCustomDelimiter("1,2:3")).toBe(null);
    });
  });

  describe("splitInputByDelimiter", () => {
    test("커스텀 구분자를 사용하여 문자열을 나누고 숫자 배열을 반환한다", () => {
      const calculator = new StringCalculator();
      expect(calculator.splitInputByDelimiter("//;\n1;2;3", ";")).toEqual([
        1, 2, 3,
      ]);
    });

    test("기본 구분자를 사용하여 문자열을 나누고 숫자 배열을 반환한다", () => {
      const calculator = new StringCalculator();
      expect(calculator.splitInputByDelimiter("1,2:3")).toEqual([1, 2, 3]);
    });
  });
});
