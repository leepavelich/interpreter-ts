import { Lexer } from "../../lexer";
import { Parser } from "..";
import { LetStatement } from "../../ast";

test("test LetStatement", () => {
  const input = `let x = 5;
    let y = 10;
    let foobar = 838383;
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
    expect((statement as LetStatement).name.value).toEqual(
      t.expectedIdentifier
    );
  });
});

test("test returnStatement", () => {
  const input = `
  return 5;
  return 10;
  return 993322;
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

  for (const statement of program.statements) {
    expect(statement.tokenLiteral()).toEqual("return");
  }
});

function assumeNotNull<T>(value: T): asserts value is NonNullable<T> {
  expect(value).not.toBeNull();
}
