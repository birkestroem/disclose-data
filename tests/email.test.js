const expect = require("unexpected");
const { discloseEmail } = require("../src/index");

describe("Disclose email", function () {
  describe("with default options", function () {
    const tests = [
      {
        input: "myFoo@barMail.one",
        output: "myF**@*********ne",
      },
      {
        input: "my@test.com",
        output: "**@******om",
      },
      {
        input: "a@b.cd",
        output: "*@**cd",
      },
      {
        input: '"shared@mailbox"@one.com',
        output: '"sh*************@*****om',
      },
      {
        input:
          '"very.(),:;<>[]".VERY."very@\\ "very".unusual"@strange.example.com',
        output:
          '"ve******************************************@*****************om',
      },
    ];

    tests.forEach(function (test) {
      const maskedEmail = discloseEmail(test.input);

      describe(test.input, function () {
        it(`should be sufficiently masked to ${test.output}`, function () {
          expect(maskedEmail, "to be", test.output);
        });

        it("should be equal in length", function () {
          expect(maskedEmail.length, "to be", test.output.length);
        });
      });
    });
  });

  describe("with invalid email", function () {
    const tests = [
      {
        input: "@one.com",
        output: "@*****om",
      },
      {
        input: "birkestroem@",
        output: "bir********@",
      },
      {
        input: "@",
        output: "@",
      },
      {
        input: "",
        output: "",
      },
      {
        input: " jesper @ birkestroem . dk ",
        output: " je*****@****************k ",
      },
    ];

    tests.forEach(function (test) {
      const maskedEmail = discloseEmail(test.input);

      describe(test.input, function () {
        it(`should still work and equal ${test.output}`, function () {
          expect(maskedEmail, "to be", test.output);
        });
      });
    });
  });

  describe("with multibyte characters?", function () {});

  describe("with custom options", function () {});
});
