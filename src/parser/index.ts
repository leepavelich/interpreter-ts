import { Identifier, LetStatement, Program, Statement } from "../ast";
import { Lexer } from "../lexer";
import { Token, TokenType } from "../token";

export class Parser {
  private l: Lexer;
  private currToken: Token;
  private peekToken: Token;
  public errors: string[];

  constructor(lexer: Lexer) {
    this.l = lexer;
    this.errors = [];

    this.nextToken();
    this.nextToken();
  }

  private nextToken() {
    this.currToken = this.peekToken;
    this.peekToken = this.l.getNextToken();
  }

  public parseProgram(): Program | null {
    const program = new Program();

    while (!this.currTokenIs(TokenType.Eof)) {
      const statement = this.parseStatement();
      if (statement !== null) {
        program.statements.push(statement);
      }
      this.nextToken();
    }
    return program;
  }

  private parseStatement(): Statement | null {
    switch (this.currToken.type) {
      case TokenType.Let:
        return this.parseLetStatement();
      default:
        return null;
    }
  }

  private parseLetStatement(): LetStatement | null {
    const statement = new LetStatement(this.currToken);

    if (!this.expectPeek(TokenType.Ident)) {
      return null;
    }

    statement.name = new Identifier(this.currToken, this.currToken.literal);

    if (!this.expectPeek(TokenType.Assign)) {
      return null;
    }

    // // TODO: We're skipping the expressions until we encounter a semicolon
    while (!this.currTokenIs(TokenType.Semicolon)) {
      this.nextToken();
    }

    return statement;
  }

  private currTokenIs(tokenType: Token["type"]): boolean {
    return this.currToken.type === tokenType;
  }

  private peekTokenIs(tokenType: Token["type"]): boolean {
    return this.peekToken.type === tokenType;
  }

  private expectPeek(tokenType: Token["type"]): boolean {
    if (this.peekTokenIs(tokenType)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(tokenType);
      return false;
    }
  }

  public getErrors(): string[] {
    return this.errors;
  }

  private peekError(tokenType: Token["type"]): void {
    const message = `expected next token to be ${tokenType}, got ${this.peekToken.type} instead`;
    this.errors.push(message);
  }
}
