import { Lexer } from "../../lexer";
import { Parser } from "..";

test("test LetStatement", () => {
  const input = `let x 5;
    let = 10;
    let 838383;
    `;

  const lexer = new Lexer(input);
  const parser = new Parser(lexer);

  const program = parser.parseProgram();

  const errors = parser.getErrors();
  if (errors.length !== 0) {
    errors.forEach((e) => console.log(`parser error: ${e}`));
  }

  expect(errors.length).toBe(0);
  assumeNotNull(program);
  expect(program.statements.length).toBe(3);

  const tests: { expectedIdentifier: string }[] = [
    { expectedIdentifier: "x" },
    { expectedIdentifier: "y" },
    { expectedIdentifier: "foobar" },
  ];

  tests.forEach((t, i) => {
    const statement = program.statements[i];

    expect(statement.tokenLiteral()).toEqual("let");
    expect(statement.name.value).toEqual(t.expectedIdentifier);
  });
});

function assumeNotNull<T>(value: T): asserts value is NonNullable<T> {
  expect(value).not.toBeNull();
}
