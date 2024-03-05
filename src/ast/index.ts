import { Token } from "../token";

abstract class Node {
  abstract tokenLiteral(): string;
}

abstract class Statement extends Node {
  abstract statementNode(): void;
}

abstract class Expression extends Node {
  abstract expressionNode(): void;
}

export class Program extends Node {
  private statements: Statement[];

  constructor(statements: Statement[] = []) {
    super();
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

export class LetStatement extends Statement {
  private token: Token;
  private name: Identifier;
  private value: Expression;

  public statementNode(): void {}

  public tokenLiteral(): string {
    return this.token.literal;
  }
}

export class Identifier extends Expression {
  private token: Token;
  value: string;

  public expressionNode(): void {}

  public tokenLiteral(): string {
    return this.token.literal;
  }
}
