import { Lexer } from "../lexer";
import { Token, TokenType } from "../../token/token";

test("test getNextToken", () => {
  const input = `let five = 5;
    let ten = 10;
    
    let add = fn(x, y) {
      x + y;
    };
    
    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;
    `;

  const tokens: Token[] = [
    { type: TokenType.Let, literal: "let" },
    { type: TokenType.Ident, literal: "five" },
    { type: TokenType.Assign, literal: "=" },
    { type: TokenType.Int, literal: "5" },
    { type: TokenType.Semicolon, literal: ";" },
    { type: TokenType.Let, literal: "let" },
    { type: TokenType.Ident, literal: "ten" },
    { type: TokenType.Assign, literal: "=" },
    { type: TokenType.Int, literal: "10" },
    { type: TokenType.Semicolon, literal: ";" },
    { type: TokenType.Let, literal: "let" },
    { type: TokenType.Ident, literal: "add" },
    { type: TokenType.Assign, literal: "=" },
    { type: TokenType.Function, literal: "fn" },
    { type: TokenType.LParen, literal: "(" },
    { type: TokenType.Ident, literal: "x" },
    { type: TokenType.Comma, literal: "," },
    { type: TokenType.Ident, literal: "y" },
    { type: TokenType.RParen, literal: ")" },
    { type: TokenType.LBrace, literal: "{" },
    { type: TokenType.Ident, literal: "x" },
    { type: TokenType.Plus, literal: "+" },
    { type: TokenType.Ident, literal: "y" },
    { type: TokenType.Semicolon, literal: ";" },
    { type: TokenType.RBrace, literal: "}" },
    { type: TokenType.Semicolon, literal: ";" },
    { type: TokenType.Let, literal: "let" },
    { type: TokenType.Ident, literal: "result" },
    { type: TokenType.Assign, literal: "=" },
    { type: TokenType.Ident, literal: "add" },
    { type: TokenType.LParen, literal: "(" },
    { type: TokenType.Ident, literal: "five" },
    { type: TokenType.Comma, literal: "," },
    { type: TokenType.Ident, literal: "ten" },
    { type: TokenType.RParen, literal: ")" },
    { type: TokenType.Semicolon, literal: ";" },

    { type: TokenType.Bang, literal: "!" },
    { type: TokenType.Minus, literal: "-" },
    { type: TokenType.Slash, literal: "/" },
    { type: TokenType.Asterisk, literal: "*" },
    { type: TokenType.Int, literal: "5" },
    { type: TokenType.Semicolon, literal: ";" },
    { type: TokenType.Int, literal: "5" },
    { type: TokenType.LessThan, literal: "<" },
    { type: TokenType.Int, literal: "10" },
    { type: TokenType.GreaterThan, literal: ">" },
    { type: TokenType.Int, literal: "5" },
    { type: TokenType.Semicolon, literal: ";" },
  ];

  const lexer = new Lexer(input);

  for (const token of tokens) {
    expect(lexer.getNextToken()).toEqual(token);
  }
});
