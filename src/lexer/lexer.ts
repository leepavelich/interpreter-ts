import { Token, TokenItem, TokenType } from "../token/token";

function createToken(type: TokenItem, literal: string): Token {
  return { type, literal };
}

const _0 = "0".charCodeAt(0);
const _9 = "9".charCodeAt(0);

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const _ = "_".charCodeAt(0);

function isLetter(char: string): boolean {
  const ch = char.charCodeAt(0);
  return (a <= ch && ch <= z) || (A <= ch && ch <= Z) || ch === _;
}

function isDigit(char: string): boolean {
  const ch = char.charCodeAt(0);
  return _0 <= ch && ch <= _9;
}

const Keywords = {
  fn: createToken(TokenType.Function, "fn"),
  let: createToken(TokenType.Let, "let"),
} as const;

export class Lexer {
  private position: number = 0;
  private readPosition: number = 0;
  private ch: string;

  constructor(private input: string) {
    this.readChar();
  }

  public getNextToken(): Token {
    this.skipWhitepsace();

    let tok: Token | undefined;

    switch (this.ch) {
      case "=":
        tok = createToken(TokenType.Assign, this.ch);
        break;
      case ";":
        tok = createToken(TokenType.Semicolon, this.ch);
        break;
      case "(":
        tok = createToken(TokenType.LParen, this.ch);
        break;
      case ")":
        tok = createToken(TokenType.RParen, this.ch);
        break;
      case ",":
        tok = createToken(TokenType.Comma, this.ch);
        break;
      case "+":
        tok = createToken(TokenType.Plus, this.ch);
        break;
      case "{":
        tok = createToken(TokenType.LBrace, this.ch);
        break;
      case "}":
        tok = createToken(TokenType.RBrace, this.ch);
        break;
      case "\0":
        tok = createToken(TokenType.Eof, "");
        break;
    }

    if (isLetter(this.ch)) {
      const ident = this.readIdentifier();
      const keyword = Keywords[ident as keyof typeof Keywords];
      if (keyword) {
        return keyword;
      } else {
        return createToken(TokenType.Ident, ident);
      }
    } else if (isDigit(this.ch)) {
      const digit = this.readNumber();
      return createToken(TokenType.Int, digit);
    } else if (!tok) {
      return createToken(TokenType.Illegal, this.ch);
    }

    this.readChar();
    return tok;
  }

  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  private readIdentifier(): string {
    const position = this.position;

    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private readNumber(): string {
    const position = this.position;

    while (isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private skipWhitepsace(): void {
    while (
      this.ch == " " ||
      this.ch == "\t" ||
      this.ch == "\n" ||
      this.ch == "\r"
    ) {
      this.readChar();
    }
  }
}
