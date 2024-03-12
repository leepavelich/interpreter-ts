import { Token } from "../token";

export type Statement = LetStatement;

export class Program {
  public statements: Statement[];

  constructor(statements: Statement[] = []) {
    this.statements = statements;
  }

  public tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return "";
    }
  }
}

export class LetStatement {
  private token: Token;
  public name: Identifier;
  public value: Identifier;

  constructor(token: Token) {
    this.token = token;
  }

  public statementNode(): void {}

  public tokenLiteral(): string {
    return this.token.literal;
  }
}

export class Identifier {
  private token: Token;
  value: string;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }

  public expressionNode(): void {}

  public tokenLiteral(): string {
    return this.token.literal;
  }
}
