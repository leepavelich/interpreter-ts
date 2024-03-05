import { Program } from "../ast";
import { Lexer } from "../lexer";
import { Token } from "../token";

class Parser {
  private l: Lexer;
  private currToken: Token;
  private peekToken: Token;

  constructor(lexer: Lexer) {
    this.l = lexer;

    this.nextToken();
    this.nextToken();
  }

  private nextToken() {
    this.currToken = this.peekToken;
    this.peekToken = this.l.getNextToken();
  }

  private parseProgram(): Program | null {
    return null;
  }
}
