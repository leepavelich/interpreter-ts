import { Lexer } from "../../lexer";
import { Parser } from "..";

test("test LetStatement", () => {
  const input = `let x = 5;
    let y = 10;
    let foobar = 838383;
    `;

  const lexer = new Lexer(input);
  const parser = new Parser(lexer);

  const program = parser.parseProgram();
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
