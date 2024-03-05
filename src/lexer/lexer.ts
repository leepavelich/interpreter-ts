import { Token, TokenItem, TokenType } from "../token/token";

export class Lexer {
  private position: number = 0;
  private readPosition: number = 0;
  private ch: string;

  constructor(private input: string) {
    this.readChar();
  }

  public getNextToken(): Token {
    let tok: Token;

    switch (this.ch) {
      case "=":
        tok = this.createToken(TokenType.Assign, this.ch);
        break;
      case ";":
        tok = this.createToken(TokenType.Semicolon, this.ch);
        break;
      case "(":
        tok = this.createToken(TokenType.LParen, this.ch);
        break;
      case ")":
        tok = this.createToken(TokenType.RParen, this.ch);
        break;
      case ",":
        tok = this.createToken(TokenType.Comma, this.ch);
        break;
      case "+":
        tok = this.createToken(TokenType.Plus, this.ch);
        break;
      case "{":
        tok = this.createToken(TokenType.LBrace, this.ch);
        break;
      case "}":
        tok = this.createToken(TokenType.RBrace, this.ch);
        break;
      default:
        tok = this.createToken(TokenType.Eof, "");
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

  private createToken(type: TokenItem, literal: string): Token {
    return { type, literal };
  }
}
